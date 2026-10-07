// scripts/test-connection.js
// ============================================================
//  Run this script to verify MongoDB Atlas connectivity.
//  Usage: node scripts/test-connection.js
//
//  Requires .env to be set up with MONGODB_URI.
//  NEVER commit credentials to GitHub.
// ============================================================

'use strict';

require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME     = process.env.DB_NAME || 'eduyodha';

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set. Create server/.env from server/.env.example');
  process.exit(1);
}

async function testConnection() {
  console.log('🔌 Testing MongoDB Atlas connection...');
  console.log(`   Database : ${DB_NAME}`);
  // Show host only — never log credentials
  const hostMatch = MONGODB_URI.match(/@([^/]+)/);
  if (hostMatch) console.log(`   Host     : ${hostMatch[1]}`);

  const client = new MongoClient(MONGODB_URI, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
  });

  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });

    const db = client.db(DB_NAME);
    const collections = await db.listCollections().toArray();

    console.log('\n✅ Connection successful!');
    console.log(`   Connected to: ${DB_NAME}`);
    console.log(`   Collections : ${collections.length > 0 ? collections.map(c => c.name).join(', ') : '(none yet — will be created on first insert)'}`);

    // Verify write access
    const testColl = db.collection('_connection_test');
    const insertResult = await testColl.insertOne({ test: true, ts: new Date() });
    await testColl.deleteOne({ _id: insertResult.insertedId });
    console.log('   Write test  : ✅ Read & Write access confirmed');

    console.log('\n🎉 EDU YODHA backend is ready to connect to MongoDB Atlas!');
  } catch (err) {
    console.error('\n❌ Connection failed:', err.message);
    console.error('\nCommon fixes:');
    console.error('  1. Check MONGODB_URI in server/.env — password must be correct');
    console.error('  2. In Atlas → Network Access → Add IP: 0.0.0.0/0 (allow all) or your IP');
    console.error('  3. Check database user "sangappaa92_db_user" has readWrite role');
  } finally {
    await client.close();
  }
}

testConnection();
