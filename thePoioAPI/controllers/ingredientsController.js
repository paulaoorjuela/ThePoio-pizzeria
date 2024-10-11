const IngredientsModel = require('../models/ingredients.model')

exports.readIngredients = async(req, res) => {
    try {
        let ingredientData = await IngredientsModel.find()
        res.json(ingredientData)
    } catch (error) {
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}

exports.createIngredient = async(req, res) => {
    try {
        let newIngredient = new IngredientsModel(req.body)
        await newIngredient.save()
        res.send(newIngredient)
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}

exports.updateIngredient = async(req, res) => {
    try {
        if(req.params.id.length == 24) {
            let ingredientData = await IngredientsModel.findById(req.params.id)
        if(!ingredientData){
            res.status(404).send({error: 'no se ha encontrado el Album'})
            return
        }
        const{ingredient_name, ingredient_quantity, ingredient_src_img, price} = req.body

        ingredientData.ingredient_name = ingredient_name
        ingredientData.ingredient_quantity = ingredient_quantity
        ingredientData.ingredient_src_img = ingredient_src_img
        ingredientData.ingredient_price = price

        ingredientData = await IngredientsModel.findOneAndUpdate({_id: req.params.id},ingredientData,{new: true})
        res.json(ingredientData)
        }else{
            res.status(403).send({error: 'El id no es valido'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}

exports.deleteIngredient = async(req, res) =>{
    try {
        let ingredientData = await IngredientsModel.findById(req.params.id)
        if(!ingredientData){
            res.status(404).send({error: 'no se ha encontrado el Album'})
            return
        }
        await IngredientsModel.findOneAndDelete({_id: req.params.id})
        res.status(200).send({msg: 'eliminado correctamente'})
        console.log(ingredientData);
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}

exports.readOneIngredient = async(req, res) =>{
    try {
        let ingredientData = await IngredientsModel.findById(req.params.id)
        if(!ingredientData){
            res.status(404).send({error: 'no se ha encontrado el album'})
        }else{
            res.send(ingredientData)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}
