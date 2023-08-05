const express = require ('express')
const router = express.Router()
const userController = require('../controllers/user.js')

router.post('/signup', userController.addUser)

router.post('/login', userController.login)

router.post('/logout', userController.logout)

router.post('/updatetoken', userController.updateToken)

router.post('/getauth', userController.getAuth)

module.exports = router