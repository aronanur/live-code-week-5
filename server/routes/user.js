const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/login', userController.loginHandler)
router.post('/register', userController.register)

module.exports = router