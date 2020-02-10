const router = require('express').Router()
const comicController = require('../controllers/comicController')

router.get('/comics', comicController.fetchData)
router.get('/comics/:id', comicController.fetchDataById)
router.put('/comics/:id', comicController.updateComic)

module.exports = router