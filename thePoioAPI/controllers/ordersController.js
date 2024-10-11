const orderModel = require('../models/orders.model')

exports.readOrders = async(req, res) => {
    try {
        let orderData = await orderModel.find()
        res.json(orderData)
    } catch (error) {
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}

exports.createOrder = async(req, res) => {
    try {
        let newOrder = new orderModel(req.body)
        await newOrder.save()
        res.send(newOrder)
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}

exports.updateOrder = async(req, res) => {
    try {
        if(req.params.id.length == 24) {
            let orderData = await orderModel.findById(req.params.id)
        if(!orderData){
            res.status(404).send({error: 'no se ha encontrado el Pedido'})
            return
        }
        const{user_name, products, products_total_price, phone, address} = req.body

        orderData.user_name = user_name
        orderData.products = products
        orderData.products_total_price = products_total_price
        orderData.phone = phone
        orderData.address = address


        orderData = await orderModel.findOneAndUpdate({_id: req.params.id},orderData,{new: true})
        res.json(orderData)
        }else{
            res.status(403).send({error: 'El id no es valido'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}

exports.deleteOrder = async(req, res) =>{
    try {
        let orderData = await orderModel.findById(req.params.id)
        if(!orderData){
            res.status(404).send({error: 'no se ha encontrado el pedido'})
            return
        }
        await orderModel.findOneAndDelete({_id: req.params.id})
        res.status(200).send({msg: 'eliminado correctamente'})
        console.log(orderData);
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}

exports.readOneOrder = async(req, res) =>{
    try {
        let orderData = await orderModel.findById(req.params.id)
        if(!orderData){
            res.status(404).send({error: 'no se ha encontrado el pedido'})
        }else{
            res.send(orderData)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}
