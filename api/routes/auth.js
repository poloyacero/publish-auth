const express = require('express');
const route = express.Router();
const authController = require('../../controllers/authController');
const middleware = require('../../middleware/auth');

route.post('/register', middleware.validateRegistration, authController.register);
route.get('/info', middleware.authenticate, authController.userInfo);
route.post('/logout', authController.logout);
route.patch('/profile', middleware.authenticate, authController.profile);
route.post('/reset-password', middleware.validateResetPassword, authController.passwordReset);
route.post('/forgot-password', authController.forgotPassword);
route.post('/confirmation', middleware.validateConfirmation, authController.confirmation);
route.post('/resend-confirmation', authController.resendConfirmation);
route.get('/health', authController.health);

module.exports = route;