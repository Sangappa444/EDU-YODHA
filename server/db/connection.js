// ============================================================
//  EDU YODHA — MongoDB Atlas Connection
//  db/connection.js
//
//  Uses connection pooling — one client is reused across the app.
//  MONGODB_URI must be set as an environment variable.
//  NEVER hard-code credentials in this file.
// ============================================================

'use strict';

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// ── Validate that MONGODB_URI is set ─────────────────────────
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME     = process.env.DB_NAME || 'eduyodha';

if (!MONGODB_URI) {
  throw new Error(
    '❌ MONGODB_URI environment variable is not set.\n' +
    '   Set it in your .env file (development) or AWS environment (production).\n' +
    '   Example format: mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/'
  );
}

// ── MongoDB client options ────────────────────────────────────
const clientOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  // Connection pool settings — optimal for AWS EC2 / Lambda
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

// ── Singleton client (connection reuse / pooling) ─────────────
let client = null;
let db     = null;

/**
 * Connect to MongoDB Atlas.
 * Call once at server startup. The connection is reused on every request.
 */
async function connectDB() {
  if (client && db) {
    console.log('♻️  Reusing existing MongoDB connection.');
    return db;
  }

  console.log('🔌 Connecting to MongoDB Atlas...');

  client = new MongoClient(MONGODB_URI, clientOptions);
  await client.connect();

  // Ping the database to confirm connection
  await client.db('admin').command({ ping: 1 });

  db = client.db(DB_NAME);

  console.log(`✅ Connected to MongoDB Atlas — database: "${DB_NAME}"`);
  return db;
}

/**
 * Get the database instance.
 * connectDB() must have been called first (done at server startup).
 */
function getDB() {
  if (!db) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return db;
}

/**
 * Get a specific collection.
 * Shorthand for getDB().collection(name).
 */
function getCollection(name) {
  return getDB().collection(name);
}

/**
 * Gracefully close the connection (for tests and graceful shutdown).
 */
async function closeDB() {
  if (client) {
    await client.close();
    client = null;
    db     = null;
    console.log('🔌 MongoDB connection closed.');
  }
}

// ── Graceful shutdown on process signals ─────────────────────
process.on('SIGINT',  async () => { await closeDB(); process.exit(0); });
process.on('SIGTERM', async () => { await closeDB(); process.exit(0); });

module.exports = { connectDB, getDB, getCollection, closeDB };
