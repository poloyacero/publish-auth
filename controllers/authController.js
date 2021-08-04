const db = require('../database/mysql');
const User = db.users;
const AuthUser = db.auth;
const { createUser, getUser, updateUser, isExist, savePasscode, deleteCodes } = require('../services/query/index');
const { hashPassword, parseToken, randomInt } = require('../services/utils/index');
const { emailPasscodeTemplate } = require('../services/mail');

const authController = {};

authController.register = async (req, res, next) => {
  const { email, contact_name, password } = req.body;
  try {
    // TODO: check if the email is verified then email is still available if not

    const hashedPassword = await hashPassword(password);
    const user = await createUser(User, { contact_name: contact_name, email: email });
    const authUser = await createUser(AuthUser, { email: email, password: hashedPassword, u_id: user.id, email_verified: true });

    return res.status(200).json({
      success: true,
      message: 'Success'
    });

  }catch(err) {
    return next(err);
  }
}

authController.userInfo = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const parsed = await parseToken(token);
    const userInfo = await getUser(User, { id: parsed.id });

    return res.status(200).json({
      success: true,
      object: userInfo
    });
  }catch(err) {
    return next(err);
  }
}

authController.profile = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const { contact_name, business, business_name, address, city, state_province, postal_code, phone } = req.body;
  const payload = {};
  try {
    const parsed = await parseToken(token);

    if(contact_name != undefined && contact_name != "" && contact_name != null) {
      payload['contact_name'] = contact_name;
    }
    if(business != undefined && business != "" && business != null) {
      payload['business'] = business;
    }
    if(business_name != undefined && business_name != "" && business_name != null) {
      payload['business_name'] = business_name;
    }
    if(address != undefined && address != "" && address != null) {
      payload['address'] = address;
    }
    if(city != undefined && city != "" && city != null) {
      payload['city'] = city;
    }
    if(state_province != undefined && state_province != "" && state_province != null) {
      payload['state_province'] = state_province;
    }
    if(postal_code != undefined && postal_code != "" && postal_code != null) {
      payload['postal_code'] = postal_code;
    }
    if(phone != undefined && phone != "" && phone != null) {
      payload['phone'] = phone;
    }

    const updated = await updateUser(User, { id: parsed.id }, payload);
    if(updated) {
      return res.status(200).json({
        success: true,
        message: "Success"
      });
    }
  }catch(err) {
    return next(err);
  }
}

authController.passwordReset = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const updated = await updateUser(AuthUser, { email: email }, { password: hashedPassword });

    await deleteCodes(email);

    if(updated) {
      return res.status(200).json({
        success: true,
        message: "Success"
      });
    }
  }catch(err) {
    return next(err);
  }
}

authController.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const itIs = await isExist(AuthUser, { email: email });
    const passcode = await randomInt(6);

    if(itIs) {
      await savePasscode(email, passcode);
      emailPasscodeTemplate(passcode, email);
    }

    return res.status(200).json({
      success: true,
      message: "Success"
    });
  }catch(err) {
    return next(err);
  }
}

authController.logout = async (req, res, next) => {
  return res.status(200).json({
    success: true
  });
}

// health check route
authController.health = async (req, res) => {
  return res.status(200).json({
    success: true
  });
}

module.exports = authController;