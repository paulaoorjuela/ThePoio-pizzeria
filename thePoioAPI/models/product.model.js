const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    product_name:{
        type: String,
        required: true
    },
    product_price:{
        type: Number,
        required: true
    },
    product_src_img:{
        type: String,
        required: true
    },
    product_type:{
        type: String,
        required: true
    },
    product_ingredients:{
        type: String,
        required: false
    }
},{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('products', productSchema)
