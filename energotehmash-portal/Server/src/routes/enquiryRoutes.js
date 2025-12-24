// src/routes/enquiryRoutes.js
const express = require('express');
const {
  createEnquiry,
  listEnquiries,
  updateEnquiryStatus,
} = require('../controllers/enquiryController');
const { auth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', createEnquiry);      // публичная форма
router.get('/', auth, listEnquiries); // только авторизованные (менеджеры)
router.put('/:id/status', auth, updateEnquiryStatus);

module.exports = router;
