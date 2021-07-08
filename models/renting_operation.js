const mongoose = require('mongoose')
const RentingOperation = mongoose.model('RentingOperation', {
    total_payment: {
        type: Number
    },
    total_days: {
        type: Number
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    status_operation: {
        type: String,
        enum: ["requested", "shipping", "closed"],
        default: "requested"
    },
    user: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.ObjectId,
        ref: 'Product'
    }
})

module.exports = RentingOperation