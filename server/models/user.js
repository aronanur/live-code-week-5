'use strict';

const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model { }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize
  })

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};