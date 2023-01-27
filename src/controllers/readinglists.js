const router = require('express').Router()

const { Readinglists } = require('../models')

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

module.exports = router