const db = require('../database/mysql');
const User = db.users;
const AuthUser = db.auth;
const { createUser, getUser, updateUser, isExist, savePasscode, deleteCodes, saveConfirmationcode, deleteConfirmationcode } = require('../services/query/index');
const { hashPassword, parseToken, randomPasscode } = require('../services/utils/index');
const { emailPasscodeTemplate, confirmationEmailTemplate } = require('../services/mail');
const { Boom } = require('@hapi/boom');

const authController = {};

authController.register = async (req, res, next) => {
  const { email, contact_name, password } = req.body;
  let authUser;
  try {
    const userExist = await getUser(AuthUser, { email: email })
    const hashedPassword = await hashPassword(password);
    if(userExist) {
      if(!userExist.email_verified) {
        authUser = await updateUser(AuthUser, { id: userExist.id }, { password: hashedPassword });
      }
    }else {
      const user = await createUser(User, { contact_name: contact_name, email: email });
      authUser = await createUser(AuthUser, { email: email, password: hashedPassword, u_id: user.id, email_verified: false });
    }

    const code = await randomPasscode();
    await saveConfirmationcode(email, code);
    confirmationEmailTemplate(code, email, contact_name);

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
    const passcode = await randomPasscode();

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

authController.confirmation = async (req, res, next) => {
  const { email } = req.body;
  try {
    const updated = await updateUser(AuthUser, { email: email }, { email_verified: true });
    await deleteConfirmationcode(email)

    return res.status(200).json({
      success: true,
      message: "Success"
    });
  }catch(err) {
    return next(err);
  }
}

authController.resendConfirmation = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await getUser(User, { email: email });
    const authUser = await getUser(AuthUser, { email: email });
    if(!authUser.email_verified) {
      const code = await randomPasscode();
      await saveConfirmationcode(email, code);
      confirmationEmailTemplate(code, email, user.contact_name);
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