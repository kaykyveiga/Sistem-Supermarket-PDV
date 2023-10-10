const express = require('express')
const app = express()
const db = require('./db/conn')
const Product = require('./models/Product')
const Establishment = require('./models/Establishment')
const Cart = require('./models/Cart')
const CartProduct = require('./models/CartProduct')
const Users = require('./models/Users')
const cors = require('cors')

app.use(express.json())

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSucessStatus: 200

}
app.use(cors(corsOptions))

//Routes
const establishmentRoutes = require('./routes/EstablishmentRoutes')
const productRoutes = require('./routes/ProductRoutes')
const usersRoutes = require('./routes/UsersRoutes')
app.use('/establishment', establishmentRoutes)
app.use('/product', productRoutes)
app.use('/users', usersRoutes)


db
.sync()
//.sync({force:true})
//.sync({alter: true})
.then(()=>
app.listen(5000)
)
.catch((error)=>{
    console.log(error)
})
