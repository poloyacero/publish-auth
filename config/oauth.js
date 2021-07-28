const { access_token_secret, refresh_token_secret } = require('../config/config_key');
console.log(refresh_token_secret)

const OAuthServer = require('../services/oauth/oauth2server');
const jwtMixin = require('../services/oauth/index');

const oauth = new OAuthServer({
  model: {
    ...jwtMixin({
      accessTokenSecret: access_token_secret,
      refreshTokenSecret: refresh_token_secret,
      issuer: 'https://api.thepublishing.com',
      userId: 'id',
      clientRedirectUri: null,
      algorithms: ['RS256']
    })
  },
  allowEmptyState: true,
  grants: ['authorization_code', 'refresh_token', 'password', 'token_exchange', 'passwordless_otp'],
});

module.exports = oauth;