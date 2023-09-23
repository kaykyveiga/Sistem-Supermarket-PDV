const jwt = require('jsonwebtoken')
const getToken = require('../helpers/getToken')
require('dotenv').config()

async function verifyOneToken(req, res, next){
    const token = await getToken(req)
    if(!token){
        res.status(401).json({message: 'Acesso negado, entre com sua conta para acessar!'})
        return
    }
    jwt.verify(token,process.env.SECRET, function(error, decoded){
        if(error){
            res.status(422).json({message: 'Token inválido'})
        }else{
            req.SupermarketId = decoded.id
            next()
        }
        
    })
    
}
module.exports = verifyOneToken