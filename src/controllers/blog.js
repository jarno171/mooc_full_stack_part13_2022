const router = require('express').Router()

const { tokenExtractor } = require('../util/middleware')

const { User, Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    include: {
      model: User
    }
  })
  res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
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

router.delete('/:id', tokenExtractor, blogFinder, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)

  if (req.blog && user && user.id === req.blog.userId) {
    await req.blog.destroy()
    res.status(204).end()
  } else {
    const error = new Error('not authorized to delete blog')
    error.name = "DeleteError"
    next(error)
  }
})

module.exports = router