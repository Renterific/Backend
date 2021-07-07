<<<<<<< Updated upstream
// hello
=======
const mongoose = require('../helpers/db_connection.js')
const express = require('express');
const Product = require('../models/product.js');
const Category = require('../models/category.js');
const User = require('../models/users.js');
var multer = require('multer')
const { upload, uploadPhoto } = require('../helpers/upload-product.js')
//get all user
const productRouter = express.Router();
productRouter.get('/all-product', (req, res, next) => {
    Product.find({}).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        return next(new Error(err))
    })
})
//add user
 productRouter.post('/add-product', uploadPhoto, upload);
//update user record by id
productRouter.put('/update-product/:id', (req, res, next) => {
    let dataInserted = req.body;
    let id = req.params.id;
    User.findByIdAndUpdate(id, dataInserted).then(() => {
        res.status(200).json({ 'success': "data is Updated" })
    }).catch((err) => {
        return next(new Error(err))
    })
})
//delete user by id
productRouter.delete('/delete-product/:id', (req, res, next) => {
    let id = req.params.id
    User.findByIdAndDelete(id).then(() => {
        res.status(200).json({ 'success': "data is deleted" })
    }).catch((err) => {
        return next(new Error(err))
    })
}) 
//get product by cat_name
//get product by user_name

productRouter.get('/get-category-from-productcollection/', async(req, res, next) => {
    const product = await Product.aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'categoryData'
          }
        }
      ]).exec((err, result)=>{
        if (err) {
            return next(new Error(err))
        }
        if (result) {
            res.status(200).json(result)
        }
  });
    // const all_product = await Product.find({});
    // const data_array = [];
    // all_product.map((item)=>{
    //     const cat_id = item.category;
    //     Category.findOne({_id:cat_id}).then((cat_details)=>{
    //         data_array.push(cat_details);
    //     }).catch((err) => {
    //         return next(new Error(err))
    //     })
    // })
    
}) 

productRouter.get('/get-user-from-productcollection/', async(req, res, next) => {
    const product = await Product.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'userData'
          }
        }
      ]).exec((err, result)=>{
        if (err) {
            return next(new Error(err))
        }
        if (result) {
            res.status(200).json(result)
        }
  });
}) 




module.exports = productRouter;
>>>>>>> Stashed changes
