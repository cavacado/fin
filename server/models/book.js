'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Book.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        })
      }
    }
  });
  return Book;
};
