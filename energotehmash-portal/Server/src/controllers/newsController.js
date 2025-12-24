const prisma = require('../db/prismaClient');

const listNews = async (req, res, next) => {
  try {
    const news = await prisma.news.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 20,
    });
    res.json(news);
  } catch (err) {
    next(err);
  }
};

const createNews = async (req, res, next) => {
  try {
    const { title, slug, body, published } = req.body;
    const news = await prisma.news.create({
      data: {
        title,
        slug,
        body,
        published: !!published,
        publishedAt: published ? new Date() : null,
      },
    });
    res.status(201).json(news);
  } catch (err) {
    next(err);
  }
};

module.exports = { listNews, createNews };
