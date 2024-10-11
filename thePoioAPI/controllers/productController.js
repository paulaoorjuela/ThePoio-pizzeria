const productModel = require('../models/product.model')

exports.readProducts = async(req, res) => {
    try {
        let productData = await productModel.find()
        res.json(productData)
    } catch (error) {
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}

exports.createProduct = async(req, res) => {
    try {
        let newProduct = new productModel(req.body)
        await newProduct.save()
        res.send(newProduct)
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}

exports.updateProduct = async(req, res) => {
    try {
        if(req.params.id.length == 24) {
            let productData = await productModel.findById(req.params.id)
        if(!productData){
            res.status(404).send({error: 'no se ha encontrado el Album'})
            return
        }
        const{product_name, product_price, product_src_img, product_type, product_ingredients} = req.body

        productData.product_name = product_name
        productData.product_price = product_price
        productData.product_src_img = product_src_img
        productData.product_type = product_type
        productData.product_ingredients = product_ingredients


        productData = await productModel.findOneAndUpdate({_id: req.params.id},productData,{new: true})
        res.json(productData)
        }else{
            res.status(403).send({error: 'El id no es valido'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}

exports.deleteProduct = async(req, res) =>{
    try {
        let productData = await productModel.findById(req.params.id)
        if(!productData){
            res.status(404).send({error: 'no se ha encontrado el Album'})
            return
        }
        await productModel.findOneAndDelete({_id: req.params.id})
        res.status(200).send({msg: 'eliminado correctamente'})
        console.log(productData);
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}

exports.readOneProduct = async(req, res) =>{
    try {
        let productData = await productModel.findById(req.params.id)
        if(!productData){
            res.status(404).send({error: 'no se ha encontrado el album'})
        }else{
            res.send(productData)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}
