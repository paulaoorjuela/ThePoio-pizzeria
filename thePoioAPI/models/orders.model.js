const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    user_name:{
        type: String,
        required: true
    },
    products:{
        type: Array,
        required: true
    },
    products_total_price:{
        type: Number,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: false
    }
},{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('orders', OrderSchema)
