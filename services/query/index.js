const Boom = require('@hapi/boom');

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

module.exports = {
  createUser,
  getUser
}