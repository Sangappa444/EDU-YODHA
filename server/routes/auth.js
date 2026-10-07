// routes/auth.js — User authentication endpoints
'use strict';

const express        = require('express');
const { ObjectId }   = require('mongodb');
const { getCollection } = require('../db/connection');
const {
  hashPassword,
  verifyPassword,
  generateToken,
  requireAuth,
} = require('../middleware/auth');

// Google Auth Library — used for verifying Google ID tokens
let GoogleAuth;
try {
  GoogleAuth = require('google-auth-library');
} catch (_) {
  console.warn('[auth] google-auth-library not installed. Google sign-in disabled.');
}

const router = express.Router();

// Collection name in MongoDB Atlas (database: eduyodha)
const USERS_COLLECTION = 'users';

// ── POST /api/auth/signup ─────────────────────────────────────
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required.' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    const users = getCollection(USERS_COLLECTION);

    // Check if email already registered
    const existing = await users.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    // Hash password — NEVER store plaintext
    const passwordHash = await hashPassword(password);

    const newUser = {
      name:         name.trim(),
      email:        email.toLowerCase().trim(),
      passwordHash, // hashed with bcrypt
      role:         'student',
      college:      '',
      branch:       '',
      year:         '',
      uploads:      [],
      saved:        [],
      enrollments:  [],
      createdAt:    new Date(),
      updatedAt:    new Date(),
    };

    const result = await users.insertOne(newUser);

    // Generate JWT — never expose passwordHash in response
    const token = generateToken({ userId: result.insertedId.toString(), email: newUser.email });

    res.status(201).json({
      message: 'Account created successfully.',
      token,
      user: {
        id:    result.insertedId,
        name:  newUser.name,
        email: newUser.email,
        role:  newUser.role,
      },
    });
  } catch (err) {
    console.error('[signup error]', err.message);
    res.status(500).json({ error: 'Signup failed. Please try again.' });
  }
});

// ── POST /api/auth/login ──────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const users = getCollection(USERS_COLLECTION);
    const user  = await users.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({ error: 'Incorrect email or password.' });
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Incorrect email or password.' });
    }

    const token = generateToken({ userId: user._id.toString(), email: user.email });

    res.json({
      message: 'Login successful.',
      token,
      user: {
        id:     user._id,
        name:   user.name,
        email:  user.email,
        role:   user.role,
        college: user.college,
        branch:  user.branch,
        year:    user.year,
      },
    });
  } catch (err) {
    console.error('[login error]', err.message);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// ── GET /api/auth/me — get current user (requires token) ─────
router.get('/me', requireAuth, async (req, res) => {
  try {
    const users = getCollection(USERS_COLLECTION);
    const user  = await users.findOne(
      { _id: new ObjectId(req.userId) },
      { projection: { passwordHash: 0 } } // never return password hash
    );

    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json({ user });
  } catch (err) {
    console.error('[me error]', err.message);
    res.status(500).json({ error: 'Failed to fetch profile.' });
  }
});

// ── POST /api/auth/logout — client clears its token ──────────
router.post('/logout', (req, res) => {
  // JWT is stateless — logout is handled client-side by deleting the token.
  res.json({ message: 'Logged out successfully.' });
});

// ── POST /api/auth/google — verify Google ID token & issue JWT ─
//
//  Flow:
//    1. Frontend (GIS) gets a signed ID token from Google's servers
//    2. Frontend sends that token here via POST body { credential }
//    3. We verify it server-side with google-auth-library (no secret needed for verification)
//    4. We upsert the user in MongoDB (only safe fields — no Google password stored)
//    5. We return our own JWT — the Google credential is never stored or forwarded
//
//  Fields stored per requirement: googleId, name, email, picture, createdAt, updatedAt
//  Fields never stored: Google passwords, refresh tokens, access tokens
router.post('/google', async (req, res) => {
  if (!GoogleAuth) {
    return res.status(503).json({ error: 'Google sign-in is not available. Please use email login.' });
  }

  const { credential } = req.body;
  if (!credential || typeof credential !== 'string') {
    return res.status(400).json({ error: 'Missing Google credential token.' });
  }

  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID.startsWith('YOUR_')) {
    console.error('[google] GOOGLE_CLIENT_ID environment variable not set.');
    return res.status(503).json({ error: 'Google sign-in is not configured. Contact support.' });
  }

  try {
    // ── Step 1: Verify the ID token with Google's public keys ──────
    // google-auth-library fetches Google's public certs and verifies the
    // signature, expiry, and audience. No client secret required for this.
    const oauthClient = new GoogleAuth.OAuth2Client(GOOGLE_CLIENT_ID);
    const ticket      = await oauthClient.verifyIdToken({
      idToken:  credential,
      audience: GOOGLE_CLIENT_ID,   // rejects tokens meant for other apps
    });

    const payload = ticket.getPayload();

    // ── Step 2: Extract only the fields we need ─────────────────────
    const {
      sub:            googleId,   // Google's stable unique user ID
      email,                      // user's email
      email_verified: emailVerified,
      name,                       // full name from Google profile
      picture,                    // profile picture URL (Google CDN)
    } = payload;

    // Reject unverified emails (e.g. unconfirmed Google accounts)
    if (!email) {
      return res.status(400).json({ error: 'Google account has no email address.' });
    }
    if (!emailVerified) {
      return res.status(400).json({ error: 'Google account email is not verified.' });
    }

    // ── Step 3: Upsert user in MongoDB Atlas ────────────────────────
    const users = getCollection(USERS_COLLECTION);
    const now   = new Date();

    // Look up by googleId first (fastest), then fall back to email
    // (handles case where user previously signed up with email/password)
    let user = await users.findOne({
      $or: [{ googleId }, { email: email.toLowerCase() }],
    });

    if (user) {
      // Existing user — link Google account if not already linked,
      // and refresh name/picture in case they changed on Google.
      const updates = { updatedAt: now };
      if (!user.googleId)  updates.googleId = googleId;
      if (picture)         updates.picture  = picture;
      // Refresh name only if it was empty (don't overwrite user's custom name)
      if (!user.name && name) updates.name  = name;

      if (Object.keys(updates).length > 1) {  // more than just updatedAt
        await users.updateOne({ _id: user._id }, { $set: updates });
        Object.assign(user, updates);
      }
    } else {
      // ── New user created via Google Sign-In ──────────────────────
      // Only store what requirement 7 specifies:
      //   googleId, name, email, picture, createdAt, updatedAt
      // Plus role/college/branch/year for app features.
      // passwordHash is explicitly null — Google users have no app password (req 8).
      const newUser = {
        // ── Identity (from Google) ──────────────────────────────────
        googleId,
        name:         name  || email.split('@')[0],
        email:        email.toLowerCase(),
        picture:      picture || '',

        // ── App-specific fields ─────────────────────────────────────
        passwordHash: null,   // intentionally null — no password for Google users
        role:         'student',
        college:      '',
        branch:       '',
        year:         '',
        uploads:      [],
        saved:        [],
        enrollments:  [],

        // ── Timestamps ──────────────────────────────────────────────
        createdAt:    now,
        updatedAt:    now,
      };

      const result = await users.insertOne(newUser);
      user = { ...newUser, _id: result.insertedId };
    }

    // ── Step 4: Issue our own JWT (not Google's token) ──────────────
    // The Google credential is NOT stored or returned — it expires in 1 hour anyway.
    // We issue our own JWT (7-day expiry by default, set by JWT_EXPIRES_IN).
    const token = generateToken({ userId: user._id.toString(), email: user.email });

    // Return only safe user fields — never return passwordHash or googleId to client
    res.json({
      message: 'Google sign-in successful.',
      token,
      user: {
        id:      user._id,
        name:    user.name,
        email:   user.email,
        picture: user.picture,
        role:    user.role,
      },
    });

  } catch (err) {
    console.error('[google auth error]', err.message);

    // Distinguish between bad token vs server error
    const msg = err.message || '';
    if (msg.includes('Invalid token') || msg.includes('Token used too late') ||
        msg.includes('Wrong recipient') || msg.includes('No pem found')) {
      return res.status(401).json({ error: 'Google sign-in failed: invalid or expired token. Please try again.' });
    }
    res.status(500).json({ error: 'Google sign-in failed. Please try again.' });
  }
});

// ── GET/POST /api/auth/google/callback — OAuth2 Redirect Callback Handler ──
router.all('/google/callback', async (req, res) => {
  const { code, credential } = { ...req.query, ...req.body };

  if (credential) {
    // Forward credential to main google handler
    req.body = { credential };
    return router.handle(req, res);
  }

  const FRONTEND_URL = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://eduyodha.com' : 'http://localhost:3000');

  if (!code) {
    return res.redirect(`${FRONTEND_URL}/index.html?auth=failed`);
  }

  try {
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${req.protocol}://${req.get('host')}/api/auth/google/callback`;

    const oauth2Client = new GoogleAuth.OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      redirectUri
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    const users = getCollection(USERS_COLLECTION);
    const now = new Date();

    let user = await users.findOne({
      $or: [{ googleId }, { email: email.toLowerCase() }],
    });

    if (user) {
      const updates = { updatedAt: now };
      if (!user.googleId) updates.googleId = googleId;
      if (picture) updates.picture = picture;
      if (!user.name && name) updates.name = name;
      await users.updateOne({ _id: user._id }, { $set: updates });
    } else {
      const newUser = {
        googleId,
        name: name || email.split('@')[0],
        email: email.toLowerCase(),
        picture: picture || '',
        passwordHash: null,
        role: 'student',
        college: '',
        branch: '',
        year: '',
        uploads: [],
        saved: [],
        enrollments: [],
        createdAt: now,
        updatedAt: now,
      };
      const result = await users.insertOne(newUser);
      user = { ...newUser, _id: result.insertedId };
    }

    const token = generateToken({ userId: user._id.toString(), email: user.email });

    // Redirect to dashboard with token
    res.redirect(`${FRONTEND_URL}/dashboard.html?token=${encodeURIComponent(token)}`);
  } catch (err) {
    console.error('[Google Callback Error]', err.message);
    res.redirect(`${FRONTEND_URL}/index.html?auth=failed`);
  }
});

// ── POST /api/auth/forgot-password ───────────────────────────
// TODO: integrate with an email provider (Nodemailer / SendGrid / Resend)
// For now this returns success so the frontend flow works.
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  try {
    const users = getCollection('users');
    // Don't reveal whether the user exists (security best practice)
    await users.findOne({ email: email.toLowerCase().trim() });

    // TODO: generate a reset token, save it, and send an email.
    // For now, we just return success to prevent email enumeration.
    res.json({ message: 'If this email exists, a reset link has been sent.' });
  } catch (err) {
    console.error('[forgot-password error]', err.message);
    res.status(500).json({ error: 'Failed to process request. Please try again.' });
  }
});

module.exports = router;

