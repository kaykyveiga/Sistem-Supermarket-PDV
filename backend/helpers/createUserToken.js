const jwt = require('jsonwebtoken')
require('dotenv').config()

//CRIACAO DO TOKEN
async function createUserToken(user, req, res){
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, process.env.SECRET)
    try{
        res.status(200).json({message: 'Você está autenticado!', token: token})
    }catch(error){
         res.status(422).json({message: error})
    }
}
module.exports = createUserToken