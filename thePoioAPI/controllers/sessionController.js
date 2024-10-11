require('dotenv').config({ path: 'config.env'})
const jwt = require('jsonwebtoken')
const usersModel = require('./../models/users.model')

exports.generateToken = async (req, res) => {
    const {user_email, user_password} = req.body
    const user = await usersModel.findOne({ user_email })
    if(!user){
        return res.status(401).json({error: "Credenciales invalidas (correo)"})
    } 
    if (user.user_password !== user_password) {
        return res.status(401).json({error: "Credenciales invalidas (clave)"})
    }

    const payload = {
        id: user._id,
        user_admin : user.user_admin
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, {expiresIn: '100h'})
    return res.status(202).json({ token })
}
