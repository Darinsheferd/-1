// src/routes/productRoutes.js
const express = require('express');
const {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { auth, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', auth, adminOnly, createProduct);
router.put('/:id', auth, adminOnly, updateProduct);
router.delete('/:id', auth, adminOnly, deleteProduct);

module.exports = router;
