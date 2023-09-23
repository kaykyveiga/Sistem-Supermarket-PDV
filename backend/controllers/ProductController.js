const {Op} = require('sequelize')
const Product = require('../models/Product')
const Supermarket = require('../models/Supermarket')
const {validationResult} = require('express-validator')
const getToken = require('../helpers/getToken')
const getUserByToken = require('../helpers/getUserByToken')

function generateNumber(){
    const min = 10**12
    const max = 10**13 -1
    return Math.floor(Math.random() * (max-min + 1) + min)
}
module.exports = class ProductController{
    static async create(req, res){
        const {name, price, qty} = req.body
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
            qty: qty,
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
        const id = req.params.id
        const {name, price, qty, barcode} = req.body
        
        const product = {
            name: name,
            barcode: barcode,
            price: price,
            qty: qty
        }

        try{
            await Product.update(product, {where: {id: id}})
            res.status(200).json({message: 'Produto atualizado!'})
        }catch(error){
            res.status(422).json({message: error})
        }
    }
    static async getAllProducts(req, res){
        const products = await Product.findAll()
        try{
            res.status(200).json({message: {products}})
        }catch(error){
            res.status(422).json({message: error})
        }
    }
    static async getProductById(req, res){
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
        const {q} = req.query.search
        console.log(q)
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
        try{
            res.status(200).json({message: {products}})
        }catch(error){
            res.status(422).json({message: error})
        }
    }
}