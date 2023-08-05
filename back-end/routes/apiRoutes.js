const express = require ('express')
const router = express.Router()
const userController = require('../controllers/user.js')

router.post('/signup', userController.addUser)

router.post('/updatetoken', userController.updateToken)

module.exports = router