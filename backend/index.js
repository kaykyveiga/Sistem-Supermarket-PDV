const express = require('express')
const app = express()
const db = require('./db/conn')
const Product = require('./models/Product')
const Supermarket = require('./models/Supermarket')
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
app.use('/supermarket', SupermarketRoutes)
app.use('/product', ProductRoutes)


db
.sync()
//.sync({force:true})
.then(()=>
app.listen(5000)
)
.catch((error)=>{
    console.log(error)
})
