const jwt = require('jsonwebtoken')
require('dotenv').config()

//CRIACAO DO TOKEN
async function createUserToken(user, req, res){
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, process.env.SECRET)
    return token
}
module.exports = createUserToken