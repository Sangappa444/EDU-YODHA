// routes/notes.js — Community notes CRUD
'use strict';

const express           = require('express');
const { ObjectId }      = require('mongodb');
const { getCollection } = require('../db/connection');
const { requireAuth, optionalAuth } = require('../middleware/auth');

const router = express.Router();
const NOTES_COLLECTION = 'notes';

// ── GET /api/notes — fetch all notes (public) ─────────────────
router.get('/', optionalAuth, async (req, res) => {
  try {
    const notes = getCollection(NOTES_COLLECTION);
    const { branch, semester, category, limit = 30, skip = 0 } = req.query;

    const filter = {};
    if (branch)   filter.branch   = branch;
    if (semester) filter.semester = semester;
    if (category) filter.category = category;

    const results = await notes
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Math.min(Number(limit), 100))
      .toArray();

    res.json({ notes: results, count: results.length });
  } catch (err) {
    console.error('[notes GET error]', err.message);
    res.status(500).json({ error: 'Failed to fetch notes.' });
  }
});

// ── POST /api/notes — upload a note (auth required) ───────────
router.post('/', requireAuth, async (req, res) => {
  try {
    const {
      subjectName, subjectCode, branch, semester,
      category, contributorName, collegeName, fileUrl, fileName, fileSize,
    } = req.body;

    if (!subjectName || !branch || !semester || !fileUrl) {
      return res.status(400).json({ error: 'subjectName, branch, semester and fileUrl are required.' });
    }

    const notes = getCollection(NOTES_COLLECTION);
    const newNote = {
      subjectName,
      subjectCode:     subjectCode || '',
      branch,
      semester,
      category:        category || 'Notes',
      contributorName: contributorName || '',
      collegeName:     collegeName || '',
      fileUrl,
      fileName:        fileName || '',
      fileSize:        fileSize || '',
      uploadedBy:      req.userId, // set by requireAuth middleware
      approved:        false,      // admin must approve before public listing
      createdAt:       new Date(),
      updatedAt:       new Date(),
    };

    const result = await notes.insertOne(newNote);
    res.status(201).json({ message: 'Note uploaded successfully.', noteId: result.insertedId });
  } catch (err) {
    console.error('[notes POST error]', err.message);
    res.status(500).json({ error: 'Failed to upload note.' });
  }
});

// ── DELETE /api/notes/:id — delete own note ───────────────────
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const notes = getCollection(NOTES_COLLECTION);
    const result = await notes.deleteOne({
      _id:        new ObjectId(req.params.id),
      uploadedBy: req.userId, // can only delete own notes
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Note not found or not authorized.' });
    }

    res.json({ message: 'Note deleted.' });
  } catch (err) {
    console.error('[notes DELETE error]', err.message);
    res.status(500).json({ error: 'Failed to delete note.' });
  }
});

module.exports = router;
