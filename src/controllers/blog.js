const router = require('express').Router()

const { User, Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.findOne()
    const blog = await Blog.create({...req.body, userId: user.id})
    return res.json(blog)
  } catch(error) {
    next(error)
  }
})

router.put('/:id', blogFinder, async (req, res, next) => {

  if (req.blog) {
    try {
      req.blog.likes = req.body.likes
      await req.blog.save()
      res.json(req.blog)
    } catch(error) {
      next(error)
    }
  } else {
    const error = new Error('blog id missing')
    error.name = 'IdMissing'
    next(error)
  }
})

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
  }
  res.status(204).end()
})

module.exports = router