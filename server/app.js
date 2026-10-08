// ============================================================
//  EDU YODHA — Express Application Definition
//  Runs locally (npm start) and on Render.com free tier
// ============================================================

'use strict';

require('dotenv').config();
const express   = require('express');
const helmet    = require('helmet');
const cors      = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// ── Trust proxy (required for Render, AWS, Heroku etc.) ──────
// Ensures req.ip is the real client IP, not the proxy IP.
// Rate-limiting and logging depend on this.
app.set('trust proxy', 1);

// ── Security headers ─────────────────────────────────────────
app.use(helmet());

// ── CORS Configuration ───────────────────────────────────────
// Add your Render service URL to this list too (it will be
// something like https://eduyodha-api.onrender.com).
// eduyodha.com and localhost are always allowed.
const allowedOrigins = [
  'https://eduyodha.com',
  'https://www.eduyodha.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

// Also allow any *.onrender.com subdomain so the Render preview
// URL works without a redeploy every time Render spins up a new one.
function isOriginAllowed(origin) {
  if (!origin) return true;  // curl / Postman / same-origin server requests
  if (allowedOrigins.includes(origin)) return true;
  // Allow Render preview URLs: https://eduyodha-api-xxxx.onrender.com
  if (/^https:\/\/[a-z0-9-]+\.onrender\.com$/.test(origin)) return true;
  return false;
}

app.use(cors({
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) return callback(null, true);
    callback(new Error(`CORS: Origin ${origin} not allowed`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ── Body parsing ─────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// ── Rate limiting ────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,                  // max 200 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// ── API Routes ───────────────────────────────────────────────
app.use('/api/health',      require('./routes/health'));
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/notes',       require('./routes/notes'));
app.use('/api/internships', require('./routes/internships'));
app.use('/api/users',       require('./routes/users'));

// Root endpoint for simple health/ping
app.get('/', (req, res) => {
  res.json({
    service: 'EDU YODHA API',
    status: 'online',
    documentation: 'https://eduyodha.com',
  });
});

// ── 404 Handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err.message || err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
