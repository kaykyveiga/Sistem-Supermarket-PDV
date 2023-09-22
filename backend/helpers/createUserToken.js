const jwt = require('jsonwebtoken')

async function createUserToken(user, req, res){
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, "sistema_supermercado")
    try{
        await res.status(200).json({message: 'Você está autenticado', token: token, SupermarketId: user.id})
    }catch(error){
        await res.status(500).json({message: error})
    }
}
module.exports = createUserToken