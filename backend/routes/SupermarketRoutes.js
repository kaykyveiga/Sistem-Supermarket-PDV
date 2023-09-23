const express = require('express')
const router = express.Router()
const SupermarketController = require('../controllers/SupermarketController')
const {body} = require('express-validator')

router.post('/register', [
    body('name').notEmpty().withMessage(`O campo nome não pode estar vazio`),
    body('proprietary').notEmpty().withMessage(`O campo propriétário não pode estar vazio`),
    body('email').notEmpty().withMessage(`O campo email não pode estar vazio`),
    body('password').notEmpty().withMessage(`O campo senha não pode estar vazio`),
    body('confirmPassword').notEmpty().withMessage(`O campo confirme senha não pode estar vazio`),
    body('phone').notEmpty().withMessage(`O campo telefone não pode estar vazio`),
    body('cnpj').notEmpty().withMessage(`O campo cnpj não pode estar vazio`),
    body('state').notEmpty().withMessage(`O campo estado não pode estar vazio`),
    body('city').notEmpty().withMessage(`O campo cidade não pode estar vazio`),
    body('zipcode').notEmpty().withMessage(`O campo CEP não pode estar vazio`)
] , SupermarketController.Register)
router.post('/login', [
    body('email').notEmpty().withMessage(`O campo email não pode estar vazio`),
    body('password').notEmpty().withMessage(`O campo senha não pode estar vazio`)
], SupermarketController.Login)
router.get('/getuser', SupermarketController.getUser)
router.patch('/edituser/:id', SupermarketController.editUser)
module.exports = router