// src/routes/reportRoutes.js
const express = require('express');
const { getSummary } = require('../controllers/reportController');
const { auth, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/summary', auth, adminOnly, getSummary);

module.exports = router;
