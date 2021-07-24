'use strict';

module.exports = (sequelize, Sequelize) => {
  const OAuthGrants = sequelize.define('oauth_grants', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    client_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });
  
  return OAuthGrants;
};