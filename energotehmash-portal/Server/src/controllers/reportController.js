// src/controllers/reportController.js
const prisma = require('../db/prismaClient');
const pool = require('../db/pgPool');

const getSummary = async (req, res, next) => {
  try {
    const [usersCount, enquiriesCount] = await Promise.all([
      prisma.user.count(),
      prisma.enquiry.count(),
    ]);

    const enquiriesByStatus = await prisma.enquiry.groupBy({
      by: ['status'],
      _count: { _all: true },
    });

    // Пример использования pg для "ручного" отчёта по популярным продуктам
    const { rows: topProducts } = await pool.query(
      `
      SELECT p.id, p.name, COUNT(ei.id) as enquiry_count
      FROM "EnquiryItem" ei
      JOIN "Product" p ON p.id = ei."productId"
      GROUP BY p.id, p.name
      ORDER BY enquiry_count DESC
      LIMIT 5;
    `
    );

    res.json({
      usersCount,
      enquiriesCount,
      enquiriesByStatus,
      topProducts,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSummary };
