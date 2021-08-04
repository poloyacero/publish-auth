const { EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_REQUIRETLS, EMAIL_USERNAME, EMAIL_PASSWORD } = require('../config/config_key')
const nodemailer = require('nodemailer');

const emailService = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_SECURE,
    requireTLS: EMAIL_REQUIRETLS,
    auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD
    }
});

emailService.verify(async (error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Mailer is ready to take messages');
    }
})

module.exports = emailService;