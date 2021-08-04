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
      allowNull: false,
      unique: {
        msg: 'Email not available'
      },
      isEmail: true
    },
    business: {
      type: Sequelize.ENUM('sole_proprietor', 'company', 'government', 'university', 'non-profit', 'other'),
      defaultValue: null,
    },
    business_name: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    address: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    city: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    state_province: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    postal_code: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    phone: {
      type: Sequelize.STRING,
      defaultValue: null
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