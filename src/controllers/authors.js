const router = require('express').Router()
const { User, Blog } = require('../models')
const { Op } = require("sequelize");
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('count', sequelize.col('*')), 'articles'],
      [sequelize.fn('sum', sequelize.col('likes')), 'likes']
    ],
    group: 'author',
    order: [
      ['likes', 'DESC']
    ]
  })
  res.json(blogs)
})

module.exports = router