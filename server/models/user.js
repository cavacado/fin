'use strict';

const bcrypt = require('bcryptjs');

function hashPassword(user,options) {
  if (!user.changed('password')) return
  return bcrypt
    .hash(user.password, 10)
    .then(hash => user.password = hash)
}

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { min: 5, max: 99 }
    },
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Book, {
          foreignKey: 'userId'
        })
      }
    },
    instanceMethods: {
      authenticated: function(password, callback) {
        bcrypt.compare(password, this.password, function(err, res) {
          if (err) callback(err)
          else callback(null, res ? true : false);
        });
      }
    }
  });
  return User;
};
