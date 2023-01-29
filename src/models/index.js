const Blog = require('./blog')
const User = require('./user')
const Readinglists = require('./readinglist')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglists, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglists })

User.hasOne(Session)
Session.belongsTo(User)

module.exports = {
  Blog,
  User,
  Readinglists,
  Session
}