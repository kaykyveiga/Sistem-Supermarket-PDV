const jwt = require('jsonwebtoken')
require('dotenv').config()
const Establishment = require("../models/Establishment")
const getToken = require('./getToken')

const getEstablishmentByTokenFunction = async (req, res)=>{
    const token = await getToken(req)
    if(!token){
        res.status(401).json({message: "Acesso negado!"})
        return
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET)
        const establishmentId = decoded.id
        const establishmentExists = await Establishment.findOne({where: {id: establishmentId}})
        if(!establishmentExists){
            res.status(422).json({message: "Usuário não encontrado!"})
            return
        }
        return establishmentExists
    }catch(error){
        res.status(422).json({message: error})
    }
    
}
module.exports = getEstablishmentByTokenFunction