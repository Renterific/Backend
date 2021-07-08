const mongoose = require('../helpers/db_connection.js')
const express = require('express');
const User = require('../models/users.js');
var multer  = require('multer')
const {upload,uploadPhoto} = require('../helpers/upload')

const userRouter = express.Router();

module.exports = userRouter;