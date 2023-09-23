const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const {body} = require('express-validator')
const verifyToken = require('../helpers/verifyToken')

router.post('/create', [
    body('name').notEmpty().withMessage('O campo NOME não pode ser vazio'),
    body('barcode').notEmpty().withMessage('O campo CÓDIGO DE BARRAS não pode ser vazio'),
    body('price').notEmpty().withMessage('O campo PREÇO não pode ser vazio'),
    body('qty').notEmpty().withMessage('O campo QUANTIDADE não pode ser vazio'),
],verifyToken, ProductController.create)

module.exports = router