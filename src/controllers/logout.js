const router = require('express').Router()

const { Session } = require('../models/')

router.delete('/', async (request, response) => {
  const userId = request.body.userId

  // make sure user has only one session
  await Session.destroy({
    where: {
        user_id: userId
    }
  })

  response.status(200).send({ userId: userId })
})

module.exports = router