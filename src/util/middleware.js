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

  next(error)
}

module.exports = {
  errorHandler
}