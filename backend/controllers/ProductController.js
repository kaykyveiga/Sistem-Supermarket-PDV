const {Op} = require('sequelize')
const Product = require('../models/Product')
const CartProduct = require('../models/CartProduct')
const Cart = require('../models/Cart')
const Supermarket = require('../models/Supermarket')
const {validationResult} = require('express-validator')
const getUserByToken = require('../helpers/getUserByToken')

//GERA UM NÚMERO COM 13 ALGORITMOS QUE SIMULA O CÓDIGO DE BARRAS DE UM PRODUTO
function generateNumber(){
    const min = 10**12
    const max = 10**13 -1
    return Math.floor(Math.random() * (max-min + 1) + min)
}
module.exports = class ProductController{
    //CRIACAO DO PRODUTO
    static async create(req, res){
        const {name, price, totalAmount} = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(422).json({message: errors})
            return
        }
        const user = await getUserByToken(req, res)
        const randomNumber = generateNumber()
        const product = {
            name: name,
            barcode: randomNumber.toString(),
            price: price,
            totalAmount: totalAmount,
            SupermarketId: user.id
        }
        try{
            await Product.create(product)
            res.status(200).json({message: "Produto cadastrado!"})
        }catch(error){
            res.status(422).json({message: error})
            return
        }
    }
    static async delete(req, res){
        //EXCLUSAO DO PRODUTO
        const id = req.params.id
        try{
            const productExists = await Supermarket.findOne({where: {id: id}})
            if(!productExists){
                res.status(422).json({message: "Produto não encontrado!"})
                return
            }
            await Product.destroy({where: {id: id}})
            res.status(200).json({message: "Produto excluído!"})
        }catch(error){
            res.status(422).json({message: error})
        }
    }
    static async editProduct(req, res){
        //EDICAO DO PRODUTO
        const id = req.params.id
        const {name, price, totalAmount, barcode} = req.body
        
        const product = {
            name: name,
            barcode: barcode,
            price: price,
            totalAmount: totalAmount
        }

        try{
            await Product.update(product, {where: {id: id}})
            res.status(200).json({message: 'Produto atualizado!'})
        }catch(error){
            res.status(422).json({message: error})
        }
    }
    static async getAllProducts(req, res){
        //BUSCA TODOS OS PRODUTOS E ORDENA PELO NOME EM ORDER CRESCENTE
        const products = await Product.findAll({
            order: [['name', 'ASC']]
        })
        try{
            res.status(200).json({message: {products}})
        }catch(error){
            res.status(422).json({message: error})
        }
    }
    static async getProductById(req, res){
        //BUSCA O PRODUTO PELO ID
        const id = req.params.id
        const product = await Product.findOne({where: {id: id}})
        if(!product){
            res.status(422).json({message: 'Produto não encontrado!'})
            return
        }
        try{
            res.status(200).json({message: product})
        }catch(error){
            res.status(422).json({message: error})
        }
    }
    static async getProductsByName(req, res){
        //BUSCA O PRODUTO PELO NOME
        const {q} = req.query
        try{
            const products = await Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${q}%`
                    }
                }
            })
            if(products.length === 0){
                res.status(422).json({message: 'Produto não encontrado!'})
                return
            }
            res.status(200).json({message: {products}})
        }catch(error){
            res.status(422).json({message: error})
        }
    }
    static async updateStock(req, res){
        const id= req.params.id
        const qty = Number(req.body.qty)

        if (isNaN(qty) || qty <= 0) {
            res.status(422).json({ message: 'Quantidade inválida.' });
            return;
        }
        const product = await Product.findOne({where: {id: id}})
        console.log(product)
        
        if(!product){
            res.status(422).json({message: 'Produto não encontrado!'})
            return
        }
        
        if((product.totalAmount - qty) < 0){
            res.status(422).json({message: 'Produto indisponível na quantidade selecionada!'})
            return
        }
        
        try{
            let totalAmount = product.totalAmount - qty
            await Product.update({totalAmount: totalAmount}, {where: {id:id}})
            res.status(200).json({message: 'Estoque atualizado!'})
        }catch(error){
            res.status(422).json({message: error})
        } 
    }
    static async addCart(req, res){
        const id = req.params.id
        const quantity = req.body.quantity
        const newCart = req.body.newCart
        const user = await getUserByToken(req, res)
        
        let cartId
        
        if(newCart){
            const createdCart = await Cart.create({SupermarketId: user.id})
            cartId = createdCart.id
        }else{
            const existingCart = await Cart.findAll({
                order: [['id', 'DESC']],
                limit: 1
            })
            if(existingCart.length > 0){
                cartId = existingCart[0].id
            }else{
                const createdCart = await Cart.create({SupermarketId: user.id})
                cartId = createdCart.id
            }
            
        }
        
        const product = await Product.findOne({where: {id: id}})
        
        if(!product){
            res.status(422).json({message: 'Produto não encontrado!'})
            return
        }
        const productsIds = {
            cartId: cartId,
            productId: product.id,
            quantity: quantity
        }
        const cartProduct = [productsIds.id]

        try{
            await CartProduct.update(cartProduct, {where: {cartId: cartId}})
            res.status(200).json({message: 'Produto adicionado!'})
        }catch(error){
            return res.status(500).json({message: error})
        }
    }
}