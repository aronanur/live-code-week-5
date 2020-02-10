const verify = require('../helper/jwtVerify')
const createError = require('http-errors')


module.exports = (req, res, next) => {
    try {
        const token = req.headers.access_token
        const user = verify(token)
        next()
    } catch (error) {
        next(createError(403, 'Forbidden'))
    }
}