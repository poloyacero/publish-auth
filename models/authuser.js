'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, Sequelize) => {
  const AuthUsers = sequelize.define('auth_users', {
    id: {
      type: Sequelize.UUIDV4,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        msg: 'Email not available'
      },
      isEmail: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    email_verified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    provider: {
      type: Sequelize.ENUM('null'),
      defaultValue: null
    },
    u_id: {
      type: Sequelize.UUIDV4,
      allowNull: false
    }
  }, {
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });

  AuthUsers.beforeCreate(user => user.id = uuidv4());
  
  return AuthUsers;
};