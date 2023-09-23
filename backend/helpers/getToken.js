async function getOneToken(req){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    return token
}
module.exports = getOneToken