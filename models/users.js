const mongoose = require('mongoose')
const User = mongoose.model('User', {
    Name: {
        type: String
    },
    image: {
        type: String
    },
    Phone:{
        type:Number
    },
    Email:{
        type:Text
    },
    Password:{
        type:Text
    },
    Address:{
        type:{
            street:String,
            city:String,
            lang:String,
            lat:String
        }
    }
})

module.exports = User