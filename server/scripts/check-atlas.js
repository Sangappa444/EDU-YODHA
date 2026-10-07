// scripts/check-atlas.js — Run this to diagnose MongoDB Atlas connection
// Usage: node scripts/check-atlas.js
'use strict';

require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set in .env');
  process.exit(1);
}

console.log('🔌 Testing MongoDB Atlas connection...');
console.log('   URI (masked):', MONGODB_URI.replace(/:([^@]+)@/, ':****@'));

const client = new MongoClient(MONGODB_URI, {
  serverApi: { version: ServerApiVersion.v1 },
  connectTimeoutMS: 8000,
  serverSelectionTimeoutMS: 8000,
});

(async () => {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('✅ Connected to MongoDB Atlas successfully!');

    const db = client.db('eduyodha');
    const collections = await db.listCollections().toArray();
    console.log(`   Database: eduyodha`);
    console.log(`   Collections: ${collections.map(c => c.name).join(', ') || '(none yet)'}`);

    // Check users collection
    const users = db.collection('users');
    const userCount = await users.countDocuments();
    console.log(`   Users registered: ${userCount}`);

    if (userCount > 0) {
      const sample = await users.findOne({}, { projection: { passwordHash: 0, googleId: 0 } });
      console.log('   Latest user (safe fields):', JSON.stringify({
        name: sample.name,
        email: sample.email,
        role: sample.role,
        hasGoogleLogin: !!sample.googleId,
        createdAt: sample.createdAt,
      }, null, 2));
    }

  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    if (err.message.includes('SSL') || err.message.includes('tls') || err.message.includes('ECONNREFUSED')) {
      console.error('\n  ⚠️  FIX: Your IP is not whitelisted in MongoDB Atlas.');
      console.error('  👉  Go to: https://cloud.mongodb.com');
      console.error('           → Your Project → Network Access → Add IP Address');
      console.error('           → Add: 0.0.0.0/0  (Allow from anywhere — for development)');
      console.error('           OR add just your current IP for better security.');
    }
  } finally {
    await client.close();
    process.exit(0);
  }
})();
