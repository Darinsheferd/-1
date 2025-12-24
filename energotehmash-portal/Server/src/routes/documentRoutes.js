// src/routes/documentRoutes.js
const express = require('express');
const {
  listDocuments,
  createDocument,
} = require('../controllers/documentController');
const { auth, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', listDocuments);
router.post('/', auth, adminOnly, createDocument);

module.exports = router;
