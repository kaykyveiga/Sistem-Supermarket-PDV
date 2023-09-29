const jwt = require('jsonwebtoken')
require('dotenv').config()
const Supermarket = require('../models/Supermarket')
const getToken = require('../helpers/getToken')

//OBTEM O USUARIO A PARTIR DO TOKEN
const getUserByTokenFunction = async (req, res)=>{
    const token = await getToken(req)
    if(!token){
        res.status(401).json({message: "Acesso negado!"})
        return
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET)
        const supermarketId = decoded.id
        const supermarketExists = await Supermarket.findOne({where: {id: supermarketId}})
        if(!supermarketExists){
            res.json(422).json({message: "Usuário não encontrado!"})
            return
        }
        return supermarketExists
    }catch(error){
        res.status(422).json({message: error})
    }
    
}
module.exports = getUserByTokenFunction
