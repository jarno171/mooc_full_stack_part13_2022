const router = require('express').Router()

const { User, Blog, Readinglists } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog
    },
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    next(error)
  }
})

router.put('/:username', async (req, res, next) => {
  const user = await User.findOne({ where: { username: req.params.username }})
  if (user) {
    try {
      user.username = req.body.username
      await user.save()
      res.json(user)
    } catch(error) {
      error.name = 'EmailValidation'
      next(error)
    }
  } else {
    res.status(404).end()
  }
})

router.get('/:id', async (req, res) => {

  let where = {}

  if (req.query.read === 'true') {
    where = {
      read: true
    }
  } else if (req.query.read === 'false') {
    where = {
      read: false
    }
  }

  const user = await User.findByPk(req.params.id, {
    include:
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId'] },
        through: {
          attributes: ['read', 'id'],
          where: where
        }
      }
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router