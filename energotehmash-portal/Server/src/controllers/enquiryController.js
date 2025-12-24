// src/controllers/enquiryController.js
const prisma = require('../db/prismaClient');

const createEnquiry = async (req, res, next) => {
  try {
    const { customerName, company, email, phone, comment, items } = req.body;

    const enquiry = await prisma.enquiry.create({
      data: {
        customerName,
        company,
        email,
        phone,
        comment,
        items: {
          create: (items || []).map((it) => ({
            productId: it.productId || null,
            quantity: it.quantity || null,
            note: it.note || null,
          })),
        },
      },
      include: { items: true },
    });

    res.status(201).json(enquiry);
  } catch (err) {
    next(err);
  }
};

const listEnquiries = async (req, res, next) => {
  try {
    const { status } = req.query;

    const where = {};
    if (status) where.status = status;

    const enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { items: true, manager: true },
    });

    res.json(enquiries);
  } catch (err) {
    next(err);
  }
};

const updateEnquiryStatus = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const enquiry = await prisma.enquiry.update({
      where: { id },
      data: {
        status,
        userId: req.user.id, // менеджер, обработавший заявку
      },
      include: { items: true, manager: true },
    });

    res.json(enquiry);
  } catch (err) {
    next(err);
  }
};

module.exports = { createEnquiry, listEnquiries, updateEnquiryStatus };
