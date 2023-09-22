async function getOneToken(req){
    const authHeader = await req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    return token
}
module.exports = getOneToken