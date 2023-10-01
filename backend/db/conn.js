const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('Establishment', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})
module.exports = sequelize