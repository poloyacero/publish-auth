const express = require('express');
const route = express.Router();
const authController = require('../../controllers/authController');

route.post('/register', authController.register);
route.get('/info', authController.userInfo);
route.post('/logout', authController.logout);

route.get('/health', authController.health);

module.exports = route;