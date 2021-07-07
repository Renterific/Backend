const mongoose = require('../helpers/db_connection.js')
const express = require('express');
const User = require('../models/users.js');
var multer = require('multer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { upload, uploadPhoto } = require('../helpers/upload-user.js')
//get all user
const userRouter = express.Router();
userRouter.get('/all-user', (req, res, next) => {
    User.find({}).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        return next(new Error(err))
    })
})
//add user
userRouter.post('/add-user', uploadPhoto, upload);
//update user record by id
userRouter.put('/update-user/:id', (req, res, next) => {
    let dataInserted = req.body;
    let id = req.params.id;
    User.findByIdAndUpdate(id, dataInserted).then(() => {
        res.status(200).json({ 'success': "data is Updated" })
    }).catch((err) => {
        return next(new Error(err))
    })
})
//delete user by id
userRouter.delete('/delete-user/:id', (req, res, next) => {
    let id = req.params.id
    User.findByIdAndDelete(id).then(() => {
        res.status(200).json({ 'success': "data is deleted" })
    }).catch((err) => {
        return next(new Error(err))
    })
}) 
userRouter.post('/login', (req, res, next) => {
    User.findOne({ Email: req.body.Email }).then((user) => {
        //console.log(req.body.Password,user.Password)
        const resultCompare = bcrypt.compare(req.body.Password, user.Password).then((result) => {
            console.log(result)
            if (result == true) {
                const token = jwt.sign({ "id": user._id }, "baselkey")
                res.status(200).json({ "message": 'success', "token": token })
            } else {
                res.status(200).json({ "message": 'failed' })
            }

        });
    }).catch((err) => {
        next(new Error('error in return data from db'))
    })
});

module.exports = userRouter;