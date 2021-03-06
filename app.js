const { isDev, isProd } = require('./config/config_key');
const express = require('express');
const Boom = require('@hapi/boom');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongodb init
const mongodb = require('./database/mongo');
mongodb().then(() => {
    console.log('MongoDB Connected');
}).catch((e) => {
    console.log('MongoDB Error:', e);
});

// exposed routes
const authRoutes = require('./api/routes/auth');
const oauthRoutes = require('./api/routes/oauth');
app.use('/auth', authRoutes);
app.use('/oauth', oauthRoutes);

// ******************** Generate 404 Error ********************
app.use((_, res, next) => {
  return next(Boom.notFound('URL not Found!'));
});

// *********************** Error Response **********************
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, _) => {
  const { message = 'Oops! Something went wrong', isBoom, output } = error;
  if (isDev) console.log('Logs: ', error);
  if (isBoom) {
    return res.status(output.statusCode).json({
      success: false,
      message,
    });
  }
    
  return res.status(500).json({
    success: false,
    message: 'Oops! Something went wrong',
  });
});
  
module.exports = app;