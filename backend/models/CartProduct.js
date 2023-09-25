const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');
const CartProduct = sequelize.define('CartProduct', {
    // Chave estrangeira para o carrinho
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    // Chave estrangeira para o produto
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    quantity: {
        type: DataTypes.INTEGER, // Quantidade de itens no carrinho
        allowNull: false,
    },

    // Outros campos relacionados à relação, se necessário
});
const Cart = require('./Cart')
const Product = require('./Product')

Cart.belongsToMany(Product, {
    through: CartProduct,
    foreignKey: 'cartId', // Chave estrangeira que relaciona com o carrinho
    otherKey: 'productId', // Chave estrangeira que relaciona com o produto
  });
  
Product.belongsToMany(Cart, {
    through: CartProduct,
    foreignKey: 'productId', // Chave estrangeira que relaciona com o produto
    otherKey: 'cartId', // Chave estrangeira que relaciona com o carrinho
  });

module.exports = CartProduct;
