const db = require('../database/mysql');
const User = db.users;
const AuthUser = db.auth;
const { createUser, getUser } = require('../services/query/index');
const { hashPassword, parseToken } = require('../services/utils/index');

const authController = {};

authController.register = async (req, res, next) => {
  const { email, contact_name, password } = req.body;
  try {
    // TODO: check if the email is verified then email is still available if not

    const hashedPassword = await hashPassword(password);
    const user = await createUser(User, { contact_name: contact_name, email: email });
    const authUser = await createUser(AuthUser, { email: email, password: hashedPassword, u_id: user.id, email_verified: false });

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