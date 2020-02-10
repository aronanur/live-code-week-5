const router = require('express').Router()
const user = require('./user')
const comics = require('./comic')
const authen = require('../middlewares/auth')

router.use('/', user)
router.use(authen)
router.use('/', comics)

module.exports = router