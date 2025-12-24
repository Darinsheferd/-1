// src/routes/newsRoutes.js
const express = require('express');
const { listNews, createNews } = require('../controllers/newsController');
const { auth, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', listNews);
router.post('/', auth, adminOnly, createNews);

module.exports = router;
