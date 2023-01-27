const router = require('express').Router()

const { ReadingList } = require('../models')

router.get('/', async (req, res) => {
  console.log("moi")
  const readinglists = await ReadingList.findAll({ })
  res.json(readinglists)
})

router.post('/', async (req, res, next) => {
  console.log(req.body)
  try {
    //const readinglistMember = await ReadingList.create(req.body)
    //res.json(readinglistMember)
    console.log("moi")
  } catch(error) {
    next(error)
  }
})

module.exports = router