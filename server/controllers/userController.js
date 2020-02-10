const { User } = require('../models/index')
const createError = require('http-errors')
const bcrypt = require('bcryptjs')
const sign = require('../helper/jwtSign')

class UserController {

  static loginHandler(req, res, next) {
    let email = req.body.email
    let password = req.body.password

    User
      .findOne({
        where: {
          email: email
        }
      })
      .then(response => {
        if (response != null) {
          if (password === response.password) {
            const user = {
              email: response.email,
              password: response.password
            }

            let token = sign(user)
            res.status(200).json({
              access_token: token
            })
          } else {
            res.status(404).json({ message: 'Email or password is wrong' })
          }
        } else {
          res.status(404).json({ message: 'User not found' })
        }
      })
      .catch(next)
  }

  static register(req, res, next) {
    let objValue = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    User
      .create(objValue)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }

}

module.exports = UserController