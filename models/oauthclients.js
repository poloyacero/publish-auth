'use strict';

module.exports = (sequelize, Sequelize) => {
  const OAuthClients = sequelize.define('oauth_clients', {
    client_id: {
      type: Sequelize.STRING,
    },
    client_secret: {
      type: Sequelize.STRING,
    }
  }, {
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });
  
  return OAuthClients;
};