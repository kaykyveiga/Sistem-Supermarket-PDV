const express = require('express')
const router = express.Router()
const EstablishmentController = require('../controllers/EstablishmentController')
const {body} = require('express-validator')

router.post('/register', [
    body('nameEstablishment').notEmpty().withMessage(`O campo EMPRESA não pode estar vazio`),
    body('nameProprietary').notEmpty().withMessage(`O campo PROPRIETÁRIO não pode estar vazio`),
    body('email').notEmpty().withMessage(`O campo E-MAIL não pode estar vazio`),
    body('password').notEmpty().withMessage(`O campo SENHA não pode estar vazio`),
    body('confirmPassword').notEmpty().withMessage(`O campo CONFIRMAR SENHA não pode estar vazio`),
    body('phone').notEmpty().withMessage(`O campo TELEFONE não pode estar vazio`),
    body('cnpj').notEmpty().withMessage(`O campo CNPJ não pode estar vazio`),
    body('state').notEmpty().withMessage(`O campo ESTADO não pode estar vazio`),
    body('city').notEmpty().withMessage(`O campo CIDADE não pode estar vazio`),
    body('zipcode').notEmpty().withMessage(`O campo CÓDIGO POSTAL não pode estar vazio`)
] , EstablishmentController.registerEstablishment)

router.post('/login', [
    body('email').notEmpty().withMessage(`O campo EMAIL não pode estar vazio`),
    body('password').notEmpty().withMessage(`O campo SENHA não pode estar vazio`)
], EstablishmentController.login)

router.get('/getuser', EstablishmentController.getEstablishment)

router.patch('/edituser/:id', EstablishmentController.editEstablishment)
module.exports = router