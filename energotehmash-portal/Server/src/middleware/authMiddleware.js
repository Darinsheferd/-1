// src/middleware/authMiddleware.js
const passport = require('passport');

const auth = passport.authenticate('jwt', { session: false });

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') return next();
  return res.status(403).json({ message: 'Forbidden' });
};

module.exports = { auth, adminOnly };
