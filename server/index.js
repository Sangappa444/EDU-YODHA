// ============================================================
//  EDU YODHA — Server Entry Point
//  Works locally (port 5000) and on Render.com (PORT env var)
// ============================================================

'use strict';

const app = require('./app');
const { connectDB } = require('./db/connection');

// Render.com injects PORT automatically. Local dev falls back to 5000.
const PORT = parseInt(process.env.PORT || '5000', 10);

async function startServer() {
  // Connect to MongoDB first, then start accepting requests.
  // This avoids the race condition where a request arrives before
  // the DB is ready.
  try {
    await connectDB();
  } catch (err) {
    console.warn('⚠️  MongoDB connection warning at startup:', err.message);
    console.warn('👉  Server will still start. DB-dependent routes will fail until Atlas is reachable.');
    console.warn('👉  If on localhost: verify your IP is whitelisted in MongoDB Atlas Network Access.');
    console.warn('👉  If on Render: check MONGODB_URI is set in Render Dashboard → Environment.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ EDU YODHA server running on http://0.0.0.0:${PORT}`);
    console.log(`   Environment : ${process.env.NODE_ENV || 'development'}`);
    console.log(`   Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  });
}

startServer();

module.exports = app;
