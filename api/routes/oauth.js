const express = require('express');
const route = express.Router();
const oauth = require('../../config/oauth');

route.post('/token', oauth.token());

module.exports = route;