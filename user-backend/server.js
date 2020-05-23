const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const products = require('./routes/api/products');
const prdcts = require('./routes/api/prdcts');
const detail = require('./routes/api/detail');


const app = express();

//BodyParser Middleware
app.use(express.json());

//DB config
const db = config.get('mongoURI');

//Connect to mongo
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))


//Routes
app.use('/api/products', products);
app.use('/api/prdcts', prdcts);
app.use('/api/detail', detail);

//Uploads folder
app.use('/uploads', express.static('uploads'));

//Middleware multer to upload photos
// app.use(multer({ dest: './uploads/',
//     rename: function (fieldname, filename) {
//       return filename;
//     },
//    }));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));