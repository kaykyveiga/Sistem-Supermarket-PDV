const {DataTypes} = require ('sequelize')
const sequelize = require('../db/conn')

const Users = sequelize.define('Users', {
    name: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    password: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN, 
        allowNull: false
    }
})

module.exports = Users