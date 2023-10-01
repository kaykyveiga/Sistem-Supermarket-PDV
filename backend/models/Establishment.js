const sequelize = require('../db/conn')
const {DataTypes} = require('sequelize')

const Establishment = sequelize.define('Establishment', {
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
Product.belongsTo(Establishment)
Establishment.hasMany(Product)
const Users = require('./Users')
Establishment.hasMany(Users)

module.exports = Establishment