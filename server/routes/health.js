// routes/health.js — MongoDB connection health check
'use strict';

const express    = require('express');
const { getDB }  = require('../db/connection');
const router     = express.Router();

// GET /api/health
// Returns server status and MongoDB connection status.
// Safe to expose — no credentials are included in the response.
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    // Ping MongoDB to confirm live connection
    await db.command({ ping: 1 });

    res.json({
      status:    'ok',
      server:    'EDU YODHA API',
      database:  'connected',
      dbName:    db.databaseName,
      timestamp: new Date().toISOString(),
      version:   process.env.npm_package_version || '1.0.0',
    });
  } catch (err) {
    res.status(503).json({
      status:   'error',
      server:   'EDU YODHA API',
      database: 'disconnected',
      error:    'Database connection failed',
    });
  }
});

module.exports = router;
