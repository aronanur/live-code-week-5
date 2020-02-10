const jwt = require('jsonwebtoken')

module.exports = function (user) {
    return jwt.sign(user, 'secretkey')
}