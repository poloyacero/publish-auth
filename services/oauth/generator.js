const { JWT_KEYID_ACCESS_TOKEN, JWT_KEYID_REFRESH_TOKEN } = require('../../config/config_key');

module.exports = ({ issuer, secret, userId, type }) => (token, client, user) => ({
  secret,
  issuer,

  get jwtid() {
    return token[type];
  },
  
  get exp() {
    switch (type) {
      case 'accessToken':
        // 1 month
        return Math.floor((token[`${type}ExpiresAt`]) / 1000) + (2592000 + 86400 - 3600) ;    // 1 month expiry 2592000 => (2588400 + 86400)
      case 'refreshToken':
        // 3 months
        return Math.floor((token[`${type}ExpiresAt`]) / 1000) + ((1468800 - 86400) + (86400 * 31 * 2));    // 1 month and 1 day expiry = (1468800 + 86400)
      default:
        return Math.floor(Date.now() / 1000) + 30; // seconds
    }
  },

  get iat() {
    return Math.floor(Date.now() / 1000); // seconds
  },
  
  get nbf() {
    if (type === 'refreshToken') {
      return Math.floor(token.accessTokenExpiresAt / 1000);
    } else {
      return this.iat - 1;
    }
  },

  get subject() {
    if (typeof user === 'object') {
      if (userId) {
        return String(user[userId]);
      } else {
        throw new Error('Missing userId configuration');
      }
    } else {
      return String(user);
    }
  },

  get keyid() {
    switch (type) {
      case 'accessToken':
        return JWT_KEYID_ACCESS_TOKEN;
      case 'refreshToken':
        return JWT_KEYID_REFRESH_TOKEN;
      default:
        return null;
    }
  },

  get audience() {
    return client.id;
  },
    
  get payload() {
    // nbf: this.nbf
    const payload = { iat: this.iat, exp: this.exp, type };  
    if (typeof user === 'object') {
      payload.user = user;
    }
    if (token.scope && token.scope !== 'UNSUPPORTED') {
      payload.scope = token.scope;
    }
    if (type === 'authorizationCode') {
      //payload.redirectUri = token.redirectUri;
      payload.redirectUri = null;
    }
    return payload;
  }
});
