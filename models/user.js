'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('users', {
    id: {
      type: Sequelize.UUIDV4,
      primaryKey: true
    },
    contact_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      defaultValue: null,
      unique: {
        msg: 'Email not available'
      },
      isEmail: true
    }
  }, {
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });

  Users.beforeCreate(user => user.id = uuidv4());
  
  return Users;
};