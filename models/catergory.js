const mongoose = require('mongoose')
const Category = mongoose.model('Category', {
    title: {
        type: String
    },
    decs: {
        type: String
    }
})

module.exports = Category