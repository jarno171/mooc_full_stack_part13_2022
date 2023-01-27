const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Readinglists extends Model {}

Readinglists.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  timestamps: false,
  underscored: true,
  modelName: 'reading_lists'
})

module.exports = Readinglists