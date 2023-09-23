const Product = require('../models/Product')
const Supermarket = require('../models/Supermarket')
const {validationResult} = require('express-validator')
const getToken = require('../helpers/getToken')
const getUserByToken = require('../helpers/getUserByToken')
module.exports = class ProductController{
    static async create(req, res){
        const {name, barcode, price, qty} = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(422).json({message: errors})
            return
        }
        const user = await getUserByToken(req, res)
        console.log(user)
        const product = {
            name: name,
            barcode: barcode,
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
}