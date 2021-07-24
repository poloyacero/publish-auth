'use strict';
const { SERVER_PORT } = require('../../config/config_key');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const promisify = require('promisify-any');
const InvalidTokenError = require('@compwright/oauth2-server/lib/errors/invalid-token-error');
const InvalidClientError = require('@compwright/oauth2-server/lib/errors/invalid-client-error');
const generator = require('./generator');
const signAsync = promisify(jwt.sign, 3);
const verifyAsync = promisify(jwt.verify, 3);
const { v4: uuidv4 } = require('uuid');
const db = require('../../database/mysql');
const OAuthClients = db.oauth_clients;
const OAuthGrants = db.oauth_grants;
const AuthUser = db.auth;
const User = db.users;

module.exports = (options = {}) => {
  const {
    issuer,
    accessTokenSecret,
    refreshTokenSecret,
    userId = 'id',
    clientRedirectUri = 'redirectUri',
    algorithms = ['RS256']
  } = options;

  const accessToken = generator({
    type: 'accessToken',
    secret: accessTokenSecret,
    issuer, userId
  });

  const refreshToken = generator({
    type: 'refreshToken',
    secret: refreshTokenSecret,
    issuer, userId
  });

  return {
    saveToken: async (token, client, user) => {
      const newToken = { ...token, client, user };
      const { payload, secret, iat, nbf, exp, ...params } = accessToken(token, client, user);

      // algorithm is important
      params.algorithm = 'RS256';

      newToken.accessToken = await signAsync(payload, secret, params);

      if (token.refreshToken) {
        // eslint-disable-next-line no-unused-vars
        const { payload, secret, iat, nbf, exp, ...params } = refreshToken(token, client, user);
        // algorithm is important
        params.algorithm = 'RS256';
        newToken.refreshToken = await signAsync(payload, secret, params);
      }

      return newToken;
    },

    saveAuthorizationCode: async function(code, client, user) {
      console.log('saveAuthorizationCode');
    },

    getAccessToken: async (token) => {
      console.log('getAccessToken');
      try {
        var { exp, aud, type, scope, user } = await verifyAsync(token, accessTokenSecret, {
          algorithms,
          issuer
        });
      } catch (e) {
          throw new InvalidTokenError();
      }

      if (type !== 'accessToken') {
        throw new InvalidTokenError();
      }

      if (this.getClient) {
        try {
          var client = aud && await this.getClient(aud, null);
          if (!client) {
            throw new Error();
          }
        } catch (e) {
          throw new InvalidClientError();
        }
      }

      return {
        accessToken: token,
        accessTokenExpiresAt: new Date(exp * 1000),
        scope,
        client: client || { id: aud },
        user
      };
    },

    getRefreshToken: async (token) => {
      console.log('getRefreshToken');
      try {
        var { exp, aud, type, scope, user } = await verifyAsync(token, refreshTokenSecret, {
          algorithms,
          issuer
        });
      } catch (e) {
        throw new InvalidTokenError();
      }  
      if (type !== 'refreshToken') {
        throw new InvalidTokenError();
      }  
      if (this.getClient) {
        try {
          var client = aud && await this.getClient(aud, null);
          if (!client) {
            throw new Error();
          }
        } catch (e) {
          throw new InvalidClientError();
        }
      }  
      return {
        refreshToken: token,
        refreshTokenExpiresAt: new Date(exp * 1000),
        scope,
        client: client || { id: aud },
        user
      };
    },

    getAuthorizationCode: async function(code, request) {
      console.log('getAuthorizationCode');
    },

    // eslint-disable-next-line no-unused-vars
    revokeToken: function(token) {
      return true; // not supported
    },

    // eslint-disable-next-line no-unused-vars
    revokeAuthorizationCode: function(code) {
      return true; // not supported
    },

    verifyScope: function(token, scope) {
      if (!token.scope) {
        return false;
      }  
      const requestedScopes = scope.split(' ');
      const authorizedScopes = token.scope.split(' ');
      return requestedScopes.every(s => authorizedScopes.indexOf(s) >= 0);
    },

    getClient: async (clientId, clientSecret) => {
      console.log('getClient');
      try {
        let grants = [];
        let params = { client_id: clientId };
        if (clientSecret) {
          params.client_secret = clientSecret;
        }

        const client = await OAuthClients.findOne({
          where: params,
          include: [{
            model: OAuthGrants,
            as: 'grants',
            attributes: ['name']
          }]
        });

        for(let grant of client.grants) {
          grants.push(grant.name)
        }

        const results = {
          id: client.client_id,
          clientId: client.client_id,
          clientSecret: client.client_secret,
          redirectUris: [`http://localhost:${SERVER_PORT}/oauth/callback`],
          grants: grants
        }

        return results;

      }catch(error) {
        return error
      }
    },

    getUser: async (username, password) => {
      console.log('getUser')
      try {
        const authUser = await AuthUser.findOne({
          where: {
            email: username,
            email_verified: true
          }
        });

        const user = await User.findOne({
          where: {
            id: authUser.u_id
          }
        });

        const isMatch = await bcrypt.compare(password, authUser.password);

        if(isMatch) {
          const results = {
            id: authUser.u_id,
            email: authUser.email,
            email_verified: authUser.email_verified,
            provider: authUser.provider,
            provider_id: authUser.id
          }

          return results;
        }
        return null;

      }catch(error) {
        return null;
      }
    }
  }
}