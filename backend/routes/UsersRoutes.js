const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/UsersController')
const {body} = require('express-validator')

router.post('/register', [
    body('name').notEmpty().withMessage('O campo NOME não pode ser vazio!'),
    body('password').notEmpty().withMessage('O campo SENHA não pode estar vazio!'),
    body('confirmPassword').notEmpty().withMessage('O campo COFIRMAR SENHA nÃo pode estar vazio!')
] , UsersController.register)

router.post('/login/:id', UsersController.login)

router.get('/getusers', UsersController.getUsers)

module.exports = router