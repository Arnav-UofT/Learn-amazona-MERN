import express from 'express'
import data from '../data.js'
import Product from '../models/productModel.js'
import expressAsyncHandler from 'express-async-handler'

const productRouter = express.Router()

// API to sed to frontend
productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({}) //empty object is all
    res.send(products)
}))

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // await Product.remove({})
    const createdProducts = await Product.insertMany(data.products)
    res.send({ createdProducts })
}))

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.send(product)
    }
    else {
        res.status(400).send({ message: 'Product not Found' })
    }
}))
export default productRouter