const userModel = require('../models/users.model')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'config.env' })

exports.readUsers = async(req, res) => {
    try {
        let userData = await userModel.find()
        res.json(userData)
    } catch (error) {
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}

exports.createUser = async(req, res) => {
    try {
        let newUser = new userModel(req.body)
        await newUser.save()
        res.send(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}

exports.updateUser = async(req, res) => {
    try {
        if(req.params.id.length == 24) {
            let userData = await userModel.findById(req.params.id)
        if(!userData){
            res.status(404).send({error: 'no se ha encontrado el Album'})
            return
        }
        const{user_name, user_password, user_email, user_type} = req.body

        userData.user_name = user_name
        userData.user_password = user_password
        userData.user_email = user_email
        userData.user_type = user_type

        userData = await userModel.findOneAndUpdate({_id: req.params.id},userData,{new: true})
        res.json(userData)
        }else{
            res.status(403).send({error: 'El id no es valido'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}

exports.deleteUser = async(req, res) =>{
    try {
        let userData = await userModel.findById(req.params.id)
        if(!userData){
            res.status(404).send({error: 'no se ha encontrado el Album'})
            return
        }
        await userModel.findOneAndDelete({_id: req.params.id})
        res.status(200).send({msg: 'eliminado correctamente'})
        console.log(userData);
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}

exports.readOneUser = async(req, res) =>{
    try {
        let userData = await userModel.findById(req.params.id)
        if(!userData){
            res.status(404).send({error: 'no se ha encontrado el album'})
        }else{
            res.send(userData)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Ha ocurrido algo'})
    }
}

exports.desencriptarToken = (req, res) => {
    try {
        let token = req.headers.authorization
        token = token.split(' ')
        token = token[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
        return res.json(decoded);

    } catch (error) {
        console.error('Error al desencriptar el token:', error.message);
        return null;
    }
}
