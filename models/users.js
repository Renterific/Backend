const mongoose = require('mongoose')
const User = mongoose.model('User', {
    Name: {
        type: String
    },
    image: {
        type: String
    },
    Phone: {
        type: Number
    },
    Email: {
        type: String,
        unique: true,
        index: true
    },
    Password: {
        type: String
    },
    Address: {
        street: String,
        city: String,
        lang: String,
        lat: String
    },
    Role_name:{
        type:String,
        default: 'user'
    }
})

module.exports = User