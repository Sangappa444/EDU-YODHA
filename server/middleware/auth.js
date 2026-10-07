// middleware/auth.js — Password hashing, JWT generation & verification
'use strict';

const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

// JWT_SECRET must be set as an environment variable on AWS.
// Use a strong, random 64-character string. NEVER hard-code it here.
const JWT_SECRET  = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  throw new Error(
    '❌ JWT_SECRET environment variable is not set.\n' +
    '   Set it in your .env file (development) or AWS environment (production).\n' +
    '   Generate one with: node -e "console.log(require(\'crypto\').randomBytes(64).toString(\'hex\'))"'
  );
}

// ── Password hashing (bcrypt, cost factor 12) ─────────────────
const SALT_ROUNDS = 12;

async function hashPassword(plaintext) {
  return bcrypt.hash(plaintext, SALT_ROUNDS);
}

async function verifyPassword(plaintext, hash) {
  return bcrypt.compare(plaintext, hash);
}

// ── JWT ───────────────────────────────────────────────────────

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

// ── requireAuth middleware — protects routes ──────────────────
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. Please log in.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    req.email  = decoded.email;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ error: 'Invalid token. Please log in again.' });
  }
}

// ── optionalAuth — attaches user if token present, else continues ─
function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const decoded = verifyToken(authHeader.split(' ')[1]);
      req.userId = decoded.userId;
      req.email  = decoded.email;
    } catch {
      // Invalid token is silently ignored for optional auth
    }
  }
  next();
}

module.exports = { hashPassword, verifyPassword, generateToken, requireAuth, optionalAuth };
