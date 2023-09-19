const Supermarket = require('../models/Supermarket')
const {validationResult} = require('express-validator')

module.exports = class SupermarketController{
    static async Home(req, res){
        res.send('Oi')
    }
    static async Register(req, res){ 
        
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message: errors})
        }
        const {name, proprietary, cnpj, state, city, zipcode} = req.body
        
        try{
            Supermarket.create({name: name, proprietary: proprietary, cnpj: cnpj, state: state, city: city, zipcode: zipcode })
            res.status(200).json({message: 'Supermercado cadastrado com sucesso!'})
        }catch(error){
            res.status(500).json({message: error})
        }
    }
}