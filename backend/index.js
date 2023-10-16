const express = require('express')
const app = express()

//Models
const Product = require('./models/Product')
const Establishment = require('./models/Establishment')
const Cart = require('./models/Cart')
const CartProduct = require('./models/CartProduct')
const Users = require('./models/Users')

//Cors
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSucessStatus: 200

}
app.use(cors(corsOptions))
app.use(express.json())

//Routes
const establishmentRoutes = require('./routes/EstablishmentRoutes')
const productRoutes = require('./routes/ProductRoutes')
const usersRoutes = require('./routes/UsersRoutes')
app.use('/establishment', establishmentRoutes)
app.use('/product', productRoutes)
app.use('/users', usersRoutes)

//Connection
const conn = require('./db/conn')
conn
.sync()
//.sync({force:true})
//.sync({alter: true})
.then(()=>
app.listen(5000)
)
.catch((error)=>{
    console.log(error)
})
