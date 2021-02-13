import express from 'express';
import data from './data.js';
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js';

const app = express();
const uri = process.env.MONGODB_URL || 'mongodb://localhost/dataLink'
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log('Mongodb successfully connected!')
}).catch(err => {
    console.log(err)
}) ///SERVER IS NToOT WOKRING BECAUSE USERROUTER IS THROWING 
/// SOME ERROR DUE TO PROMISE HANDLING

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(x => x._id === req.params.id)
    if (product) {
        res.send(product)
    }
    else {
        res.status(404).send({ message: 'Product Not Found' })
    }
});

app.get('/api/products', (req, res) => {
    res.send(data.products)
});

app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.send('Server Ready!');
});

//error catching middle ware
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

// eslint-disable-next-line no-undef
const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`server at localhost:${port}`);
});