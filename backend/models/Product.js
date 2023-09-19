const sequelize = require('../db/conn')
const {DataTypes} = require('sequelize')

const Product = sequelize.define('Product',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
module.exports = Product