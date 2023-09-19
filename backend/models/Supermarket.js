const sequelize = require('../db/conn')
const {DataTypes} = require('sequelize')
const Product = require('./Product')

const Supermarket = sequelize.define('Supermarket', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    proprietary: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zipcode: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Product.belongsTo(Supermarket)
Supermarket.hasMany(Product)

module.exports = Supermarket