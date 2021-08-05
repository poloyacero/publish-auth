const { validator } = require('../services/utils');
const Boom = require('@hapi/boom');
const { parseToken } = require('../services/utils/');

const middleware = {}

middleware.authenticate = async (req, res, next) => {
  try {
    if(req.headers.authorization !== undefined) {
      const token = req.headers.authorization.split(" ")[1];
      const parsed = await parseToken(token);
      if(parsed) {
        return next();
      }
    }else{
      return res.status(401).json({
        success: false,
        message: 'Authentication failed'
      });
    }
  }catch(err) {
    if(err.message === "jwt malformed" || err.message === "jwt must be provided" || err.message === "invalid token" || err.message === "invalid signature" || err.message === "jwt expired") {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed'
      });
    }else {
      return next(err);
    }
  }
}

middleware.validateRegistration = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validationRule = {
      "email": "required|email|regex:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/|emailExist",
      "password": "required|min:8"
    };

    const object = {
      email,
      password
    };

    await validator(object, validationRule, {}, (err, status) => {
      if (!status) {
        return res.status(400).json({
          success: false,
          errors: err.errors
        });
      } else {
        return next();
      }
    });

  }catch(err) {
    return next(err);
  }
}

middleware.validateResetPassword = async (req, res, next) => {
  const { email, code, password } = req.body;
  try {
    const validationRule = {
      "code": "codeExist:"+email,
      "password": "required|min:8"
    };
  
      const object = {
        code,
        password
      };
  
      await validator(object, validationRule, {}, (err, status) => {
        if (!status) {
          return res.status(400).json({
            success: false,
            errors: err.errors
          });
        } else {
          return next();
        }
      });
  }catch(err) {
    return next(err);
  }
}

middleware.validateConfirmation = async (req, res, next) => {
    const { email, code } = req.body;
    try {
      const validationRule = {
        "code": "confirmationExist:"+email,
      };
    
        const object = {
          code
        };
    
        await validator(object, validationRule, {}, (err, status) => {
          if (!status) {
            return res.status(400).json({
              success: false,
              errors: err.errors
            });
          } else {
            return next();
          }
        });
    }catch(err) {
      return next(err);
    }
  }

module.exports = middleware;