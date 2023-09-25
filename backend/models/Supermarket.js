const sequelize = require('../db/conn')
const {DataTypes} = require('sequelize')

const Supermarket = sequelize.define('Supermarket', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    proprietary: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confirmPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
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

const Product = require('./Product')
Product.belongsTo(Supermarket)
const Cart = require('./Cart')
Cart.belongsTo(Supermarket, {
    foreignKey: 'SupermarketId'
})
Supermarket.hasMany(Cart)
Supermarket.hasMany(Product)

module.exports = Supermarket