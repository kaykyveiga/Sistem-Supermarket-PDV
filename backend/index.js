const express = require('express')
const app = express()
const db = require('./db/conn')
const Product = require('./models/Product')
const Supermarket = require('./models/Supermarket')
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
const SupermarketRoutes = require('./routes/SupermarketRoutes')
const ProductRoutes = require('./routes/ProductRoutes')
const UsersRoutes = require('./routes/UsersRoutes')
app.use('/supermarket', SupermarketRoutes)
app.use('/product', ProductRoutes)
app.use('/users', UsersRoutes)


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
