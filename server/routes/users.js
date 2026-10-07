// routes/users.js — User profile management
'use strict';

const express           = require('express');
const { ObjectId }      = require('mongodb');
const { getCollection } = require('../db/connection');
const { requireAuth }   = require('../middleware/auth');

const router = express.Router();
const USERS_COLLECTION = 'users';

// ── PUT /api/users/profile — update profile ───────────────────
router.put('/profile', requireAuth, async (req, res) => {
  try {
    const { name, college, branch, year } = req.body;

    const updateFields = { updatedAt: new Date() };
    if (name)    updateFields.name    = name.trim();
    if (college) updateFields.college = college.trim();
    if (branch)  updateFields.branch  = branch;
    if (year)    updateFields.year    = year;

    const users = getCollection(USERS_COLLECTION);
    await users.updateOne(
      { _id: new ObjectId(req.userId) },
      { $set: updateFields }
    );

    res.json({ message: 'Profile updated successfully.' });
  } catch (err) {
    console.error('[profile update error]', err.message);
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

// ── POST /api/users/save — save/unsave a resource ────────────
router.post('/save', requireAuth, async (req, res) => {
  try {
    const { resourceId, action } = req.body; // action: 'save' | 'unsave'

    if (!resourceId) return res.status(400).json({ error: 'resourceId is required.' });

    const users = getCollection(USERS_COLLECTION);

    if (action === 'unsave') {
      await users.updateOne(
        { _id: new ObjectId(req.userId) },
        { $pull: { saved: resourceId } }
      );
      return res.json({ message: 'Resource removed from saved.' });
    }

    await users.updateOne(
      { _id: new ObjectId(req.userId) },
      { $addToSet: { saved: resourceId } }
    );
    res.json({ message: 'Resource saved.' });
  } catch (err) {
    console.error('[save error]', err.message);
    res.status(500).json({ error: 'Failed to save resource.' });
  }
});

module.exports = router;
