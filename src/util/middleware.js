const jwt = require('jsonwebtoken')

const { SECRET } = require('../util/config')

const { Session, User } = require('../models')

const errorHandler = (error, request, response, next) => {
  console.error(error)

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: error.message })
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    // this could probably be combined with SequelizeValidationError, and made
    // to loop all validation errors, now only returns the first
    return response.status(400).send({ error: error.errors[0].message })
  }

  if (error.name === 'IdMissing') {
    return response.status(400).send({ error: 'the given id is missing' })
  }

  if (error.name === 'DeleteError') {
    return response.status(400).send({ error: "not authorized to delete blog" })
  }

  next(error)
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const givenToken = authorization.substring(7)
      const decodedToken = jwt.verify(givenToken, SECRET)

      const session = await Session.findOne({
        include: {
          model: User,
          where: {
            disabled: false
          }
        },
        where: {
          user_id: decodedToken.id,
          token: givenToken
        }
      })
      
      if (session) {
        req.decodedToken = decodedToken
      } else {
        return res.status(401).json({ error: 'invalid session or user disabled' })
      }
    } catch(error) {
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
}