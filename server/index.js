// ============================================================
//  EDU YODHA — Backend Server
//  Node.js + Express + MongoDB Atlas
//
//  NEVER hard-code credentials here.
//  Set MONGODB_URI as an environment variable on AWS.
// ============================================================

'use strict';

const express    = require('express');
const helmet     = require('helmet');
const cors       = require('cors');
const rateLimit  = require('express-rate-limit');
const { connectDB, getDB } = require('./db/connection');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Security headers ─────────────────────────────────────────
app.use(helmet());

// ── CORS — allow only your frontend domain ───────────────────
const allowedOrigins = [
  'https://eduyodha.com',
  'https://www.eduyodha.com',
  'http://localhost:3000',   // Vite dev server
  'http://localhost:5173',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (server-to-server, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: Origin ${origin} not allowed`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ── Body parsing ─────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// ── Rate limiting ─────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // max 100 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// ── Routes ────────────────────────────────────────────────────
app.use('/api/health',      require('./routes/health'));
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/notes',       require('./routes/notes'));
app.use('/api/internships', require('./routes/internships'));
app.use('/api/users',       require('./routes/users'));

// ── 404 handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Global error handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

// ── Start server after DB connects ───────────────────────────
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ EDU YODHA server running on port ${PORT}`);
      console.log(`   Environment : ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

startServer();

module.exports = app; // for testing
