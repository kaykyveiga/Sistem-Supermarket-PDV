const {DataTypes} = require('sequelize')
const sequelize = require('../db/conn')
const Users = require('./Users')
const Cart = sequelize.define('Cart', {
    
})
Cart.belongsTo(Users)
module.exports = Cart