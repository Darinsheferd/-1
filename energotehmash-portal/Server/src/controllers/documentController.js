const prisma = require('../db/prismaClient');

const listDocuments = async (req, res, next) => {
  try {
    const { productId } = req.query;
    const where = {};
    if (productId) where.productId = Number(productId);

    const docs = await prisma.document.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(docs);
  } catch (err) {
    next(err);
  }
};

const createDocument = async (req, res, next) => {
  try {
    const { title, url, productId } = req.body;
    const doc = await prisma.document.create({
      data: {
        title,
        url,
        productId: productId ? Number(productId) : null,
      },
    });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

module.exports = { listDocuments, createDocument };
