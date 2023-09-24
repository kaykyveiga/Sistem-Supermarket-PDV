async function getOneToken(req){
    //OBTEM O TOKEN E FAZ OS DEVIDOS AJUSTES
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    return token
}
module.exports = getOneToken