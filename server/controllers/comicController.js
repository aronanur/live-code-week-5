const { Comic } = require('../models/index')
const createError = require('http-errors')

class ComicController {

    static fetchData(req, res, next) {
        Comic
            .findAll()
            .then(response => {
                if (response) {
                    res.status(200).send(response)
                } else {
                    res.status(204).json({ message: 'Comic is empty' })
                }
            })
            .catch(next)
    }

    static fetchDataById(req, res, next) {
        let objValue = {
            title: req.body.title,
            author: req.body.author,
            imageUrl: req.body.imageUrl
        }

        Comic
            .findOne({
                where: {
                    id: id
                }
            })
            .then(response => {
                if (response) {
                    res.status(200).send(response)
                } else {
                    res.status(204).json({ message: 'Comics not found' })
                }
            })
            .catch(next)
    }

    static updateComic(req, res, next) {
        Comic
            .update(objValue, {
                where: {
                    id: req.params.id
                }
            })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(next)
    }

}

module.exports = ComicController