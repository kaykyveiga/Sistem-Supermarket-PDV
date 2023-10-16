//MODELS
const Product = require('../models/Product')
const CartProduct = require('../models/CartProduct')
const Cart = require('../models/Cart')
const Establishment = require('../models/Establishment')

//HELPERS
const {Op, where} = require('sequelize')
const {validationResult} = require('express-validator')
const getUserByToken = require('../helpers/getUserByToken')
const getEstablishmentByToken = require('../helpers/getEstablishmentByToken')

//GERA UM NÚMERO COM 13 ALGORITMOS QUE SIMULA O CÓDIGO DE BARRAS DE UM PRODUTO, NÃO É NECESSÁRIO USAR EM PROJETO REAL
function generateNumber(){
    const min = 10**12
    const max = 10**13 -1
    return Math.floor(Math.random() * (max-min + 1) + min)
}
module.exports = class ProductController{
    //CRIACAO DO PRODUTO
    static async create(req, res){
        const {name, price, barcode, totalAmount} = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(422).json({message: errors})
            return
        }
        const establishment = await getEstablishmentByToken(req, res)
        const product = {
            name: name,
            price: price,
            barcode: barcode,
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
        const establishment = await getEstablishmentByToken(req, res)
        const products = await Product.findAll({
            order: [['name', 'ASC']], 
            where: {EstablishmentId: establishment.id}
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
        const establishment = await getEstablishmentByToken(req, res)
        const product = await Product.findOne({where: {id: id, EstablishmentId: establishment.id} })
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
        const establishment = await getEstablishmentByToken(req, res)
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${q}%`
                },
                EstablishmentId: establishment.id
            }
        })
        if(products.length === 0){
            res.status(422).json({message: 'Produto não encontrado!'})
            return
        }
        try{
            res.status(200).json({message: 'Produtos cadastrados: ', products: products})
        }catch(error){
            res.status(422).json({message: 'ERRO EM PROCESSAR A SOLITICITAÇÃO:' + error})
        }
    }
    static async addCart(req, res){
        //ADICIONA O PRODUTO(PEGANDO O ID) NO CARRINHO, CASO NAO EXISTIR CARRINHO CRIA-SE UM, SENAO, USA O ULTIMO CARRINHO ABERTO CRIADO
        const id = req.params.id
        const quantity = req.body.quantity
        const newCart = req.body.newCart
        const user = await getUserByToken(req, res)
        
        let cartId
        
        if(newCart){
            const createdCart = await Cart.create({UserId: user.id})
            cartId = createdCart.id
            
        }else{
            const existingCart = await Cart.findOne({
                order: [['id', 'DESC']],
                limit: 1,
                where: {checkSale: null}
            })
            if(existingCart){
                cartId = existingCart.id
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
        if(product.totalAmount - quantity < 0){
            res.status(422).json({message: 'Produto indisponível na quantidade selecionada!'})
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
        //UPDATE DE ESTOQUE, BUSCA OS PRODUTOS DE UM CARRINHO E ASSIM QUE SE FECHAR A COMPRA REALIZA A MODIFICACAO. 
        //SE A QUANTIDADE ESCOLHIDA PELO CLIENTE FOR MAIOR QUE A QUANTIDADE DISPONIVEL EM ESTOQUE, LANCA UM ERRO!
        const cartId = req.params.id
        const cart = await Cart.findOne({where: {id: cartId}})
        if(cart.checkSale){
            res.status(422).json({message: 'O carrinho selecionado já foi vendido!'})
            return
        }
        const productsInCart = await CartProduct.findAll({
            where: {
                cartId: cartId
            }
        })
        for(const cartProduct of productsInCart){
            const productId = cartProduct.productId
            const qtyInCart = cartProduct.quantity
            
            const product = await Product.findOne({where: {id: productId}})
            if(!product){
                res.status(422).json({message: 'Produto não encontrado!'})
                return
            }
            if(product.totalAmount - qtyInCart < 0){
                res.status(422).json({message: `Produto indisponível na quantidade selecionada!`})
                return
            }
        }
        
        try{
            for(const cartProduct of productsInCart){
                const productId = cartProduct.productId
                const qtyInCart = cartProduct.quantity
                const product = await Product.findOne({where: {id: productId}})
                const totalAmount = product.totalAmount - qtyInCart
                await Product.update({totalAmount: totalAmount}, {where: {id: product.id}})
                await CartProduct.update({checkSale: true}, {where: {cartId: cartId}})
                await Cart.update({checkSale: true}, {where: {id: cartId}})
            }
            res.status(200).json({message: 'Estoque atualizado!'})
        }catch(error){
            res.status(422).json({message: 'Erro em processar sua solicitação!' + error})
        }
    }
    static async expirationCart(req, res){
        //VERIFICA SE O CARRINHO ESTA ABERTO(NAO FOI VENDIDO) E VERIFICA O TEMPO DESDE QUE ELE FOI CRIADO, SE PASSAR DE 24H, O CARRINHO É EXCLUÍDO
        const currentDate = new Date()
        const carts = await Cart.findAll()
        try{
            for(const cart of carts){
                if(cart.checkSale === null){
                    const updatedAt = new Date(cart.updatedAt)
                    
                    const timeDifference = currentDate - updatedAt
                    const expirationLimit = 24 * 60 * 60 * 1000
                    if(timeDifference > expirationLimit){
                        await Cart.destroy({where: {id: cart.id}})
                    }
                }
            }
            res.status(200).json({message: 'Lista de carrinhos atualizados!'})
        }catch(error){
            res.status(422).json({message: 'Erro em processar sua solicitação!' + error})
        }
        
    }
}
