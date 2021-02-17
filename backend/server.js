import express from 'express';
// import data from './data.js';
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const uri = process.env.MONGODB_URL || 'mongodb://localhost/dataLink'
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log('Mongodb successfully connected!')
}).catch(err => {
    console.log(err)
}) // 1. Promise rejection handling error was resolved using then, try/catch
// 2. Insert many funtion timeout error in userRouter resolved
// by accessing mongo shell and starting required mongo service
// 3. MongoConnect refused error was resolved following the above steps and 
// required link was accessible

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.get('/', (req, res) => {
    res.send('Server Ready!');
});




// static data from file REMOVED 
// so express is not hosting dat anymore (REST)
// MongoDb help implement REST API using router
//
// app.get('/api/products/:id', (req, res) => {
//     const product = data.products.find(x => x._id === req.params.id)
//     if (product) {
//         res.send(product)
//     }
//     else {
//         res.status(404).send({ message: 'Product Not Found' })
//     }
// });
// app.get('/api/products', (req, res) => {
//     res.send(data.products)
// });

//error catching middle ware
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

// eslint-disable-next-line no-undef
const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`server at localhost:${port}`);
});