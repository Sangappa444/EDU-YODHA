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
  // If you need server-side token blacklisting, add a 'token_blacklist' collection.
  res.json({ message: 'Logged out successfully.' });
});

module.exports = router;
