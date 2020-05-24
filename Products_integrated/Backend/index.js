require('./db.js')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


var userRoutes = require('./controllers/userController')
const prdcts = require('./routes/api/prdcts');
const orderRoute = require('./controllers/orderController');
const productRouter = require('./controllers/productController');

var app = express()
app.use(bodyParser.json());
app.use('/order', orderRoute);
app.use('/product', productRouter);
app.use(cors({origin:'http://localhost:3000'}))
app.listen(3500,()=>console.log('Server started at : 3500'))

app.use('/user',userRoutes)
app.use('/api/prdcts', prdcts);