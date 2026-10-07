// routes/internships.js — Internship enrollments
'use strict';

const express           = require('express');
const { ObjectId }      = require('mongodb');
const { getCollection } = require('../db/connection');
const { requireAuth }   = require('../middleware/auth');

const router = express.Router();
const ENROLLMENTS_COLLECTION = 'enrollments';

// ── POST /api/internships/enroll — record paid enrollment ─────
router.post('/enroll', requireAuth, async (req, res) => {
  try {
    const { domain, razorpayPaymentId, amount, college, year } = req.body;

    if (!domain || !razorpayPaymentId) {
      return res.status(400).json({ error: 'domain and razorpayPaymentId are required.' });
    }

    const enrollments = getCollection(ENROLLMENTS_COLLECTION);

    // Check duplicate enrollment
    const existing = await enrollments.findOne({
      userId: req.userId,
      domain,
    });
    if (existing) {
      return res.status(409).json({ error: 'Already enrolled in this internship.' });
    }

    const enrollment = {
      userId:           req.userId,
      domain,
      razorpayPaymentId,
      amount:           amount || 999,
      college:          college || '',
      year:             year || '',
      status:           'active',
      enrolledAt:       new Date(),
    };

    const result = await enrollments.insertOne(enrollment);
    res.status(201).json({ message: 'Enrollment recorded.', enrollmentId: result.insertedId });
  } catch (err) {
    console.error('[enroll error]', err.message);
    res.status(500).json({ error: 'Failed to record enrollment.' });
  }
});

// ── GET /api/internships/my — get user's enrollments ─────────
router.get('/my', requireAuth, async (req, res) => {
  try {
    const enrollments = getCollection(ENROLLMENTS_COLLECTION);
    const results = await enrollments
      .find({ userId: req.userId })
      .sort({ enrolledAt: -1 })
      .toArray();

    res.json({ enrollments: results });
  } catch (err) {
    console.error('[my enrollments error]', err.message);
    res.status(500).json({ error: 'Failed to fetch enrollments.' });
  }
});

module.exports = router;
