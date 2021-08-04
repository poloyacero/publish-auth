const Boom = require('@hapi/boom');
const Passcode = require('../../models/passcode');

const createUser = async (model, details) => {
  const user = await new Promise(async (resolve, reject) => {
    try {
      const createdUser = await model.create(details);
      return resolve(createdUser);
    }catch(error) {
      if(error.errors[0].type == 'unique violation') {
        return reject(Boom.internal(
          'An account already exists for this email',
          '',
          400
        ));
      }
      return reject(Boom.internal(
        error.message,
        error.data,
        error.status,
      ));
    }
  });
  return user;
}

const getUser = async (model, details) => {
  const user = await new Promise(async (resolve, reject) => {
    try {
      const foundUser = await model.findOne({
        where: details,
        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] }
      });
      return resolve(foundUser);
    }catch(error) {
      return reject(Boom.internal(
        error.message,
        error.data,
        error.status,
      ));
    }
  });
  return user;
}

const updateUser = async (model, keyValue, details) => {
  const user = await new Promise(async (resolve, reject) => {
    try {
      const updated = await model.update(
        details,
        { where: keyValue }
      );
      return resolve(updated)
    }catch(error) {
      return reject(Boom.internal(
        error.message,
        error.data,
        error.status,
      ));
    }
  });
  return user;
}

const isExist = async (model, keyValue) => {
  const exist = await new Promise(async (resolve, reject) => {
    try {
      const itExist = await model.findOne({
        where: keyValue
      });

      if(itExist) {
        return resolve(true);
      }
      return resolve(false);
    }catch(error) {
      return reject(Boom.internal(
        error.message,
        error.data,
        error.status,
      ));
    }
  });
  return exist;
}

const savePasscode = async (email, passwordCode) => {
  const passcode = await new Promise(async (resolve, reject) => {
    try {
      const code = await Passcode.create({
        email: email,
        code: passwordCode
      });
      return resolve(code)
    }catch(error) {
      return reject(Boom.internal(
        error.message,
        error.data,
        error.status,
      ));
    }
  });
  return passcode;
}

const validPasscode = async (email, passwordCode) => {
  const valid = await new Promise(async (resolve, reject) => {
    try {
      const code = await Passcode.findOne({
        email: email,
        code: passwordCode
      });
      if(code != null) {
        return resolve(true);
      }
      return resolve(false);
    }catch(error) {
      return reject(Boom.internal(
        error.message,
        error.data,
        error.status,
      ));
    }
  });
  return valid;
}

const deleteCodes = async (email) => {
  const deleted = await new Promise(async (resolve, reject) => {
    try {
      const deleted = await Passcode.deleteMany({
        email: email
      });
      return resolve(deleted)
    }catch(error) {
      return reject(Boom.internal(
        error.message,
        error.data,
        error.status,
      ));
    }
  });
  return deleted;
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  isExist,
  savePasscode,
  validPasscode,
  deleteCodes
}