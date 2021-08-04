const { MAGIC_ROUND, access_token_public } = require('../../config/config_key');
const bcrypt = require('bcrypt');
const { randomInt, randomBytes } = require('crypto');
const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const Validator = require('validatorjs');
const { validPasscode } = require('../../services/query');

Validator.registerAsync('codeExist', async (value, attribute, req, passes) => {
  if(await validPasscode(attribute, value)) {
      passes();
  }else{
      passes(false, 'The email and code are invalid.');
  }
  return;
});

const validator = async (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages)
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

const hashPassword = async (password) => {
  const saltRounds = parseInt(MAGIC_ROUND);
  const hashedPassword = await new Promise(async (resolve, reject) => {
    await bcrypt.hash(password, saltRounds, (err, hash) => {
      if(err) {
        return reject(err);
      }
      return resolve(hash);
    });
  });
  return hashedPassword;
}

const randomString = async (size = 21, type = 'base64') => {
  const cryptString = await new Promise(async (resolve, reject) => {
    try {
      const crypted = await randomBytes(size)
      .toString(type)
      .slice(0, size);
      return resolve(crypted);
    }catch(error) {
      return reject(Boom.internal(
        error.message,
        error.data,
        error.status
      ));
    }
  });
  return cryptString
}

const randomPasscode = async () => {
  const cryptString = await new Promise(async (resolve, reject) => {
    try {
      return resolve(Math.floor(100000 + Math.random() * 900000));
    }catch(error) {
      return reject(Boom.internal(
        error.message,
        error.data,
        error.status
      ));
    }
  });
  return cryptString
}

const parseToken = async (token) => {
  const keyValue = await new Promise(async (resolve, reject) => {
    try {
      const decoded = await jwt.verify(token, access_token_public);
      const result = decoded.user;
      return resolve(result)
    }catch(error) {
      return reject(Boom.internal(
        error.message,
        error.data,
        error.status
      ));
    }
  });
  return keyValue;
}

module.exports = {
  hashPassword,
  randomString,
  parseToken,
  randomPasscode,
  validator
};