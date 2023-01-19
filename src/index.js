const { PORT, DATABASE_URL } = require('./util/config')

const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blog')

app.use(express.json())

app.use('/api/blogs', blogsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()