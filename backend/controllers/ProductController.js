const {Op, where} = require('sequelize')
const Product = require('../models/Product')
const CartProduct = require('../models/CartProduct')
const Cart = require('../models/Cart')
const Establishment = require('../models/Establishment')
const {validationResult} = require('express-validator')
const getUserByToken = require('../helpers/getUserByToken')
const getEstablishmentByToken = require('../helpers/getEstablishmentByToken')

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
        const establishment = await getEstablishmentByToken(req, res)
        const randomNumber = generateNumber()
        const product = {
            name: name,
            barcode: randomNumber.toString(),
            price: price,
            totalAmount: totalAmount,
            EstablishmentId: establishment.id
        }
        try{
            await Product.create(product)
            res.status(200).json({message: "Produto cadastrado!"})
        }catch(error){
            res.status(422).json({message: 'ERRO EM PROCESSAR A SOLITICITAÇÃO:' + error})
        }
    }
    static async delete(req, res){
        //EXCLUSAO DO PRODUTO
        const id = req.params.id
        const productExists = await Product.findOne({where: {id: id}})
            if(!productExists){
                res.status(422).json({message: "Produto não encontrado!"})
                return
            }
        try{
            await Product.destroy({where: {id: id}})
            res.status(200).json({message: "Produto excluído!"})
        }catch(error){
            res.status(422).json({message: 'ERRO EM PROCESSAR A SOLITICITAÇÃO:' + error})
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
            res.status(422).json({message: 'ERRO EM PROCESSAR A SOLITICITAÇÃO:' + error})
        }
    }
    static async getAllProducts(req, res){
        //BUSCA TODOS OS PRODUTOS E ORDENA PELO NOME EM ORDER CRESCENTE
        const products = await Product.findAll({
            order: [['name', 'ASC']]
        })
        try{
            res.status(200).send(products)
        }catch(error){
            res.status(422).json({message: 'ERRO EM PROCESSAR A SOLITICITAÇÃO:' + error})
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
            res.status(422).json({message: 'ERRO EM PROCESSAR A SOLITICITAÇÃO:' + error})
        }
    }
    static async getProductsByName(req, res){
        //BUSCA O PRODUTO PELO NOME
        const {q} = req.query
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
            res.status(200).json({message: 'Produtos cadastrados: ' + {products}})
        }catch(error){
            res.status(422).json({message: 'ERRO EM PROCESSAR A SOLITICITAÇÃO:' + error})
        }
    }
    static async addCart(req, res){
        //ADICIONA O PRODUTO(PEGANDO O ID) NO CARRINHO, CASO NAO EXISTIR CARRINHO CRIA-SE UM, SENAO, USA O ULTIMO CARRINHO CRIADO
        const id = req.params.id
        const quantity = req.body.quantity
        const newCart = req.body.newCart
        const user = await getUserByToken(req, res)
        
        let cartId
        
        if(newCart){
            const createdCart = await Cart.create({UserId: user.id})
            cartId = createdCart.id
            
        }else{
            const existingCart = await Cart.findAll({
                order: [['id', 'DESC']],
                limit: 1
            })
            if(existingCart.length > 0){
                cartId = existingCart[0].id
            }else{
                const createdCart = await Cart.create({UserId: user.id})
                cartId = createdCart.id
            }
            
        }
        
        const product = await Product.findOne({where: {id: id}})
        
        if(!product){
            res.status(422).json({message: 'Produto não encontrado!'})
            return
        }
        const cartProducts = {
            cartId: cartId,
            productId: product.id,
            quantity: quantity
        }
        const productsInCart = await CartProduct.findOne({where: {cartId: cartId, productId: product.id}})
        
        try{
            if(productsInCart){
                await CartProduct.update({quantity: productsInCart.quantity + quantity}, 
                {where: {
                    productId: cartProducts.productId,
                    cartId: cartId
                }})
            }else{
                await CartProduct.create(cartProducts)
            }
            
            res.status(200).json({message: 'Produto adicionado!'})
        }catch(error){
            return res.status(500).json({message: 'ERRO EM PROCESSAR A SOLITICITAÇÃO:' + error})
        }
    }
    static async getCart(req, res){
        //OBTEM OS PRODUTOS DE UM DETERMINADO CARRINHO(PEGANDO PELO ID) E RESPONSE COM JSON
        const id = req.params.id
        const cartProducts = await CartProduct.findAll({where: {cartId: id}})
        if(!cartProducts || cartProducts.length === 0){
            res.status(422).json({message: 'O carrinho está vazio!'})
            return
        }
        const cartProductsIds = cartProducts.map((item)=>item.productId)
        const product = await Product.findAll({where: {id: cartProductsIds}})
        
        if(!product){
            res.status(422).json({message: 'Produto não encontrado!'})
            return
        }
        
        try{
            res.status(200).json({message: cartProducts, product: product})
        }catch(error){
            res.status(422).json({message: 'ERRO EM PROCESSAR A SOLITICITAÇÃO:' + error})
        }
    }
    static async updateStock(req, res){
        //UPDATE DE ESTOQUE, BUSCA OS PRODUTOS DE UM CARRINHO E ASSIM QUE SE FECHAR A COMPRA REALIZA A MODIFICAO. 
        //SE O PRODUTO ESTIVER COM 0 UNIDADES NO ESTOQUE SE TORNA IMPOSSIVEL ADICIONAR AO CARRINHO
        const id = req.params.id
        
        const products = await CartProduct.FindAll()
        console.log(products)

        if(!product){
            res.status(422).json({message: 'Produto não encontrado!'})
            return
        }
        const qtyEntries = await CartProduct.findAll({where: {productId: product.id}})
        
        const qtyInCart = qtyEntries.reduce((total, entry)=> total + entry.quantity, 0)
        
        if((product.totalAmount - qtyInCart) < 0){
            res.status(422).json({message: 'Produto indisponível na quantidade selecionada!'})
            return
        }
        
        try{
            let totalAmount = product.totalAmount - qtyInCart
            await Product.update({totalAmount: totalAmount}, {where: {id:id}})
            res.status(200).json({message: 'Estoque atualizado!'})
        }catch(error){
            res.status(422).json({message: error})
        } 
    }
}