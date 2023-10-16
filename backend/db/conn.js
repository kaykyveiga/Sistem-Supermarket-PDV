const {Sequelize} = require('sequelize')

const conn = new Sequelize('Establishment', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})
module.exports = conn