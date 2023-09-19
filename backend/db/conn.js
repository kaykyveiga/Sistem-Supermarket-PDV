const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('supermercado', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})
module.exports = sequelize