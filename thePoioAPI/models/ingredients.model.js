const mongoose = require('mongoose')

const ingredientsSchema = mongoose.Schema({
    ingredient_name:{
        type: String,
        required: true
    },
    ingredient_quantity: {
        type: String,
        required: true
    },
    ingredient_src_img:{
        type: String,
        required: true
    },
    ingredient_price:{
        type: Number,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('ingredients', ingredientsSchema)
