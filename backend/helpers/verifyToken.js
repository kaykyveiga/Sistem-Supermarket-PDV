const jwt = require('jsonwebtoken')

async function verifyOneToken(req, res, next){
    const token = req.headers['authorization']
    if(!token){
        res.status(401).json({message: 'Nenhum token foi encontrado!'})
        return
    }
    jwt.verify(token, process.env.SECRET, function(error, decoded){
        if(error){
            res.status(500).json({message: 'Token inválido'})
            return
        }
        req.SupermarketId = decoded.id
        next()
    })
    
}
module.exports = verifyOneToken