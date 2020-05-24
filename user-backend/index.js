require('./db.js')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

var userRoutes = require('./controllers/userController')

var app = express()
app.use(bodyParser.json())
app.use(cors({origin:'http://localhost:3000'}))

app.use('/public', express.static('public'));

app.listen(3500,()=>console.log('Server started at : 3500'))

app.use('/user',userRoutes)
