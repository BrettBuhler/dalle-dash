const express = require ('express')
const router = express.Router()
const userController = require('../controllers/user.js')

router.post('/signup', userController.addUser)

router.post('/login', userController.login)

router.post('/logout', userController.logout)

router.post('/updatetoken', userController.updateToken)

router.post('/getauth', userController.getAuth)

router.post('/genimage', userController.genImage)

router.post('/saveimg', userController.saveImg)

router.post('/getimage', userController.getImage)

router.post('/uploadimage', userController.addImgToDb)

router.post('/getimagesbyid', userController.getImagesById)

router.post('/getimagesnoid', userController.getImagesNoId)

router.post('/addpayment', userController.addPayment)

module.exports = router