'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('auth_users', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      provider: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
      },
      u_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('auth_users');
  }
};