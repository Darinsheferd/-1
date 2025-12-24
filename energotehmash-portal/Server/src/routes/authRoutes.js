const express = require('express');
const { register, login } = require('../controllers/authController');
const { auth, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', auth, adminOnly, register);
router.post('/login', login);

module.exports = router;
