'use strict';
const { randomString } = require('../services/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const webClientId = await randomString(15, 'base64');
    const webClientSecret = await randomString(30, 'base64');

    await queryInterface.bulkInsert('oauth_clients', [
      { client_id: webClientId, client_secret: webClientSecret, created_at: new Date(), updated_at: new Date() }
    ], {});

    await queryInterface.bulkInsert('oauth_grants', [
      { name: 'authorization_code', client_id: 1, created_at: new Date(), updated_at: new Date() },
      { name: 'password', client_id: 1, created_at: new Date(), updated_at: new Date() },
      { name: 'refresh_token', client_id: 1, created_at: new Date(), updated_at: new Date() },
      { name: 'device_code', client_id: 1, created_at: new Date(), updated_at: new Date() },
      { name: 'token_exchange', client_id: 1, created_at: new Date(), updated_at: new Date() },
      { name: 'passwordless_otp', client_id: 1, created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OAuthClients', null, {});
    await queryInterface.bulkDelete('OAuthGrants', null, {});
  }
};
