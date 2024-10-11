const express = require('express')
const router = express.Router()
const mdJWT = require('../middleware/jwt')

const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const ingredientsController = require('../controllers/ingredientsController')
const sessionController = require('../controllers/sessionController')
const ordersController = require('../controllers/ordersController')

router.get('/read-users',mdJWT.verifyToken, userController.readUsers)
router.get('/read-one-user/:id', userController.readOneUser)
router.post('/create-user', userController.createUser)
router.put('/update-user/:id', userController.updateUser)
router.delete('/delete-user/:id', userController.deleteUser)
router.get('/token-info', userController.desencriptarToken)

router.get('/read-products', productController.readProducts)
router.get('/read-one-product/:id', productController.readOneProduct)
router.post('/create-product', productController.createProduct)
router.put('/update-product/:id', productController.updateProduct)
router.delete('/delete-product/:id', productController.deleteProduct)

router.get('/read-ingredients', ingredientsController.readIngredients)
router.get('/read-one-ingredient/:id', ingredientsController.readOneIngredient)
router.post('/create-ingredient', ingredientsController.createIngredient)
router.put('/update-ingredient/:id', ingredientsController.updateIngredient)
router.delete('/delete-ingredient/:id', ingredientsController.deleteIngredient)

router.post('/login', sessionController.generateToken) 

router.get('/read-orders', ordersController.readOrders)
router.get('/read-one-order/:id', ordersController.readOneOrder)
router.post('/create-order', ordersController.createOrder)
router.put('/update-order/:id', ordersController.updateOrder)
router.delete('/delete-order/:id', ordersController.deleteOrder)


module.exports = router
