// src/controllers/productController.js
const prisma = require('../db/prismaClient');

const listProducts = async (req, res, next) => {
  try {
    const { q, category, industry } = req.query;

    const where = {};

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { code: { contains: q, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = { slug: category };
    }

    if (industry) {
      where.industries = {
        some: { industry: { slug: industry } },
      };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        documents: true,
      },
      take: 50,
    });

    res.json(products);
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        documents: true,
        industries: { include: { industry: true } },
      },
    });

    if (!product) return res.status(404).json({ message: 'Not found' });

    res.json(product);
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, code, description, categoryId, industryIds } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        code,
        description,
        category: { connect: { id: categoryId } },
        industries: {
          create: (industryIds || []).map((id) => ({
            industry: { connect: { id } },
          })),
        },
      },
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, code, description, categoryId, industryIds } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        code,
        description,
        categoryId,
        industries: industryIds
          ? {
              deleteMany: {},
              create: industryIds.map((iid) => ({
                industry: { connect: { id: iid } },
              })),
            }
          : undefined,
      },
    });

    res.json(product);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.product.delete({ where: { id } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
