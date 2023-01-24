const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'written_year', {
      type: DataTypes.INTEGER,
      allowNull: false
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'written_year')
  },
}