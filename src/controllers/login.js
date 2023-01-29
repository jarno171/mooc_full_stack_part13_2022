const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { User, Session } = require('../models/')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)


  // make sure user has only one session
  await Session.destroy({
      where: {
          user_id: user.id
      }
  })

  const session = { token: token, user_id: user.id }

  await Session.create({ token: token, user_id: user.id })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router