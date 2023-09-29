const Users = require('../models/Users')
const {validationResult} = require('express-validator')
const getUserByToken = require('../helpers/getUserByToken')
const createToken = require('../helpers//createUserToken')
const bcryptjs = require('bcryptjs')

module.exports = class UsersController{
    static async register(req, res){
        const {name, password, confirmPassword, isAdmin} = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({message: errors})
        }

        if(!/^\d+$/.test(password)){
            res.status(422).json({message: 'A senha deve ser numérica, por favor não inclua letras ou símbolos!'})
            return
        }
        const salt = bcryptjs.genSaltSync(10)
        const passwordHash = bcryptjs.hashSync(password, salt)
        
        if(password !== confirmPassword){
            res.status(422).json({message:'As senhas precisam ser iguais!'})
            return
        }

        const supermarket = await getUserByToken(req, res)
        const user = {
            name: name,
            password: passwordHash,
            isAdmin: isAdmin,
            SupermarketId: supermarket.id
        }
        if(!isAdmin){
            user.isAdmin = false
        }
        try{
            await Users.create(user)
            await createToken(user, req, res) 
        }catch(error){
            res.status(422).json({message: error})
        }
    }
    static async login(req, res){
        const id = req.params.id
        const {password} = req.body
        
        const user = await Users.findOne({where: {id: id}})
        if(!user){
            res.status(422).json({message: 'Usuário não encontrado!'})
            return
        }
        const checkPassword = await bcryptjs.compare(password, user.password)
        if(!checkPassword){
            res.status(422).json({message: 'Senha incorreta!'})
            return
        }
        try{
            await createToken(user, req, res)
        }catch(error){
            res.status(422).json({message: error})
        }
    }
    static async getUsers(req, res){
        const users = await Users.findAll()
        if(users.length === 0){
            res.status(422).json({message: 'Nenhum usuário cadastrado!'})
            return
        }
        try{
            res.status(200).json({message: users})
        }catch(error){
            res.status(422).json({message: error})
        }
    }
}