const router = require('express').Router()

const { Readinglists, User } = require('../models')

const { tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
  const Readinglists = await Readinglists.findAll({
  })
  res.json(Readinglists)
})

router.post('/', async (req, res, next) => {
  try {
    const addeReadinglist = await Readinglists.create(req.body)
    res.json(addeReadinglist)
  } catch(error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, async (req, res) => {

  const user = await User.findByPk(req.decodedToken.id)
  const readinglist = await Readinglists.findByPk(req.params.id)

  if (user && readinglist && user.id === readinglist.userId && req.body.read) {
    readinglist.read = req.body.read
    await readinglist.save()
    res.json(readinglist)
  } else {
    const error = new Error('readinglist id is missing')
    error.name = 'IdMissing'
    next(error)
  }
})

module.exports = router