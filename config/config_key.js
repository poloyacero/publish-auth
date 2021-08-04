require('dotenv').config();
const fs = require('fs');

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';
const isProd = NODE_ENV === 'production';
const { 
  SERVER_PORT, 
  DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_DIALECT, 
  JWT_ACCESS_TOKEN_PRIVKEY, JWT_REFRESH_TOKEN_PRIVKEY, JWT_KEYID_ACCESS_TOKEN, JWT_KEYID_REFRESH_TOKEN, JWT_ACCESS_TOKEN_PUBKEY, JWT_REFRESH_TOKEN_PUBKEY, 
  EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_REQUIRETLS, EMAIL_FROM_ADDRESS, EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_FROM_NAME,
  MAGIC_ROUND,
  BASE_URL,
  MONGODB
} = process.env;

const access_token_secret = fs.readFileSync(JWT_ACCESS_TOKEN_PRIVKEY, 'utf-8');
const refresh_token_secret = fs.readFileSync(JWT_REFRESH_TOKEN_PRIVKEY, 'utf-8');
const access_token_public = fs.readFileSync(JWT_ACCESS_TOKEN_PUBKEY, 'utf-8');
const refresh_token_public = fs.readFileSync(JWT_REFRESH_TOKEN_PUBKEY, 'utf-8');

module.exports = {
  SERVER_PORT,
  DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_DIALECT,
  isDev,
  isProd,
  access_token_secret,
  refresh_token_secret,
  access_token_public,
  refresh_token_public,
  JWT_KEYID_ACCESS_TOKEN,
  JWT_KEYID_REFRESH_TOKEN,
  MAGIC_ROUND,
  EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_REQUIRETLS, EMAIL_FROM_ADDRESS, EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_FROM_NAME,
  BASE_URL,
  MONGODB
}