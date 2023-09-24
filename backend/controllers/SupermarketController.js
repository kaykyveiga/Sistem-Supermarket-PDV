const Supermarket = require('../models/Supermarket')
const {validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const createToken = require('../helpers/createUserToken')
const verifyToken = require('../helpers/verifyToken')
const getToken = require('../helpers/getToken')
const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = class SupermarketController{
    //REGISTRO DE USUÁRIO COM VALIDACAO DE ERROS USANDO EXPRESS-VALIDATOR E SENHAS CRIPTOGRAFAS COM BCRYPTJS
    static async Register(req, res){ 
        
        const {name, proprietary, email, password, confirmPassword, phone, cnpj, state, city, zipcode} = req.body
        
        const salt = bcryptjs.genSaltSync(10)
        const passwordHash = bcryptjs.hashSync(password, salt)
        
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({message: errors})
        }
         if(password !== confirmPassword){
            return res.status(422).json({message: 'As senhas precisam ser iguais'})
        }
        const userExists = await Supermarket.findOne({where:
        {email: email}})
        if(userExists){
            res.status(422).json({message: 'E-mail já cadastrado, utilize outro ou entre em sua conta!'})
            return
        }
        const user = {
            name: name,
            proprietary: proprietary,
            email: email,
            password: passwordHash,
            confirmPassword: passwordHash,
            phone: phone,
            cnpj: cnpj,
            state: state,
            city: city,
            zipcode: zipcode
        }
        try{
            await Supermarket.create(user) 
            await createToken(user, req, res)
        }catch(error){
            return res.status(422).json({message: error})
        }
    }
    //LOGIN DE USUARIO USANDO EMAIL E SENHA
    static async Login(req, res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message: errors})
        }
        const {email, password} = req.body
        const user = await Supermarket.findOne({where: {email: email}})

        if(!user){
            res.status(422).json({message: 'Não existe nenhum usuário com este e-mail, crie sua conta e tente novamente!'})
            return
        }
        
        const checkPassword = await bcryptjs.compare(password, user.password)
        
        if(!checkPassword){
            res.status(422).json({message: 'Senha incorreta!'})
            return
        }
        await createToken(user, req, res) 
    }
    //BUSCA OS DADOS DO USUÁRIO LOGADO A PARTIR DO TOKEN
    static async getUser(req, res){
        let currentUser 
        if(req.headers.authorization){
            const token = await getToken(req)
            const decoded = jwt.verify(token, process.env.SECRET)
            currentUser = await Supermarket.findOne({where: { id: decoded.id}})
            currentUser.password = ''
            if(!currentUser){
                res.status(422).json({message: 'Usuário não encontrado!'})
                return
            }
            res.status(200).send(currentUser)
        }
    }
    //EDICAO DE USUARIO
    static async editUser(req, res){
        const id = req.params.id
        const {name, proprietary, email, password, confirmPassword, phone, cnpj, state, city, zipcode} = req.body
        
        if(password !== confirmPassword){
            return res.status(422).json({message: 'As senhas precisam ser iguais'})
        }
        
        const salt = bcryptjs.genSaltSync(10)
        const passwordHash = bcryptjs.hashSync(password, salt)
        
        const user = {
            name: name,
            proprietary: proprietary,
            email: email,
            password: passwordHash,
            confirmPassword: passwordHash,
            phone: phone,
            cnpj: cnpj,
            state: state,
            city: city,
            zipcode: zipcode
        }
        const userExists = await Supermarket.findOne({where:{email: email}})

        if(userExists){
            res.status(422).json({message: "O e-mail já está sendo utilizado, escolha outro e tente novamente!"})
            return
        }
        try{
            await Supermarket.update(user, {where: {id: id}}) 
            res.status(200).json({message: "Dados atualizados!"})
        }catch(error){
            return res.status(500).json({message: error})
        }
    }
}