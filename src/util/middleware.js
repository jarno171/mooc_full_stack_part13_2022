const errorHandler = (error, request, response, next) => {
  console.error(error.name)

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: 'the given data is incorrect' })
  }

  if (error.name === 'IdMissing') {
    return response.status(400).send({ error: 'the given id is missing' })
  }

  next(error)
}

module.exports = {
  errorHandler
}