const sequelize = require('../db/conn')
const {DataTypes} = require('sequelize')
function generateNumber(){
    const min = 10**12
    const max = 10**13 -1
    return Math.floor(Math.random() * (max-min + 1) + min)
}
const Product = sequelize.define('Product',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    barcode: {
        type: DataTypes.STRING,
        defaultValue: generateNumber().toString()
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Product