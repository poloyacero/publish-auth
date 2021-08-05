const { EMAIL_FROM_NAME, EMAIL_FROM_ADDRESS, BASE_URL } = require('../../config/config_key');
const mailer = require('../../config/mailer');

const confirmationEmailTemplate = async (code, email, name) => {
    const htmlMessage = `
        <html>  
            <body style="color:#7b6b5b;">  
                <p style="text-align:center;">
                    <img src="https://thepublishing.com/logo.png"/>
                </p>
                <br/>
                <h3  style="text-align:center;">Hi ${name},</h3>
                <p style="text-align:center;">
                    Please verify that your email address is<br/> ${email} yeah, and that
                    you entered it when<br/>signing up for ThePublishing.
                </p>
                <br/>
                <p style="text-align:center;">
                    <a href=${BASE_URL+"/confirmation"}?email=${email}&code=${code}>
                        ${BASE_URL+"/confirmation"}?email=${email}&code=${code}
                    </a>
                </p>
                <br/><br/>
                <p style="text-align:center;">We love hearing from you!<br/>
                    Have any questions? Please check <a href="mailto:admin@thepublishing.com">contact us.</a>
                </p>
                <br/><br/>
                <p style="text-align:center;">
                    <b>ThePublishing</b><br/>
                    Bengtasvej 2 2900 Hellerup Denmark<br/>
                </p>
            </body>  
        </html> 
    `
    const mailOptions = {
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
        to: email,
        subject: "Please activate your account",
        text: `Please use the following code within the next 10 minutes to activate your account: ${code}`,
        html: htmlMessage,
    };

    return await mailer.sendMail(mailOptions);
}

const emailPasscodeTemplate = async (code, email) => {
    const htmlMessage = `
        <html>  
            <body style="color:#7b6b5b;">  
                <p style="text-align:center;">
                    <img src="https://thepublishing.com/logo.png"/>
                </p>
                <br/>
                <p style="text-align:center;">
                    We received a request to reset your password.<br/>
                    Use the link below to setup your new password for your account.<br/>
                    If you did not request to reset your password, ignore this email<br/>
                    and the link will expire on its own.
                </p>
                <br/>
                <p style="text-align:center;">
                    <a href=${BASE_URL+"/password-reset"}?email=${email}&code=${code}>
                        ${BASE_URL+"/password-reset"}?email=${email}&code=${code}
                    </a>
                </p>
                <br/><br/>
                <p style="text-align:center;">We love hearing from you!<br/>
                    Have any questions? Please check <a href="mailto:admin@thepublishing.com">contact us.</a>
                </p>
                <br/><br/>
                <p style="text-align:center;">
                    <b>ThePublishing</b><br/>
                    Bengtasvej 2 2900 Hellerup Denmark<br/>
                </p>
            </body>  
        </html>  
    `
    const mailOptions = {
        from: `${EMAIL_FROM_NAME} <${EMAIL_FROM_ADDRESS}>`,
        to: email,
        subject: "Reset your password",
        text: `Please use the following passcode within the next 10 minutes to set your password: ${code}`,
        html: htmlMessage,
    };

    return await mailer.sendMail(mailOptions);
}

module.exports = {
  emailPasscodeTemplate,
  confirmationEmailTemplate
}