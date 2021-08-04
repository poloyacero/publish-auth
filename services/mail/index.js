const { EMAIL_FROM_NAME, EMAIL_FROM_ADDRESS, BASE_URL } = require('../../config/config_key');
const mailer = require('../../config/mailer');

const emailPasscodeTemplate = async (code, email) => {
    const htmlMessage = `
    <html>
    <head>
        <style type="text/css">
            body {
                background-color: #000000;
                color: #ffffff;
            }

            .content p {
                margin-bottom: 30px;
                color: #f3f3f3;
                line-height: 22px;
            }

            .content h3 {
                color: #f3f3f3;
                text-align: left;
                font-size: 26px;
            }

            a {
                color: #ffffff;
                text-decoration: none;
            }

            .outer_link {
                padding-right: 30px;
            }

            .outer_link a {
                color: #fff;
                opacity: 0.85;
                font-size: 13px;
            }

            .sm_link a {
                padding-right: 15px;
            }

            .ExternalClass,
            .ExternalClass div,
            .ExternalClass font,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass td,
            img {
                line-height: 100%;
            }

            #outlook a {
                padding: 0;
            }

            .ExternalClass,
            .ReadMsgBody {
                width: 100%;
            }

            a,
            blockquote,
            body,
            li,
            p,
            table,
            td {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }

            table,
            td {
                mso-table-lspace: 0;
                mso-table-rspace: 0;
            }

            img {
                -ms-interpolation-mode: bicubic;
                border: 0;
                height: auto;
                outline: 0;
                text-decoration: none;
            }

            table {
                border-collapse: collapse !important;
            }

            #bodyCell,
            #bodyTable,
            body {
                height: 100% !important;
                margin: 0;
                padding: 0;
                font-family: ProximaNova, sans-serif;
            }

            #bodyCell {
                padding: 20px;
            }

            #bodyTable {
                width: 600px;
            }

            @font-face {
                font-family: ProximaNova;
                src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.eot);
                src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.eot?#iefix)
                        format("embedded-opentype"),
                    url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.woff)
                        format("woff");
                font-weight: 400;
                font-style: normal;
            }

            @font-face {
                font-family: ProximaNova;
                src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.eot);
                src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.eot?#iefix)
                        format("embedded-opentype"),
                    url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.woff)
                        format("woff");
                font-weight: 600;
                font-style: normal;
            }

            @media only screen and (max-width: 480px) {
                #bodyTable,
                body {
                    width: 100% !important;
                }

                a,
                blockquote,
                body,
                li,
                p,
                table,
                td {
                    -webkit-text-size-adjust: none !important;
                }

                body {
                    min-width: 100% !important;
                }

                #bodyTable {
                    max-width: 600px !important;
                }

                #signIn {
                    max-width: 280px !important;
                }
            }
        </style>
    </head>

    <body>
        <center style="background-color: #000000">
            <table
                style="
                    width: 600px;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    margin: 0;
                    padding: 0;
                    font-family: 'ProximaNova', sans-serif;
                    border-collapse: collapse !important;
                    height: 100% !important;
                "
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                height="100%"
                width="100%"
                id="bodyTable"
            >
                <tr>
                    <td
                        align="center"
                        valign="top"
                        id="bodyCell"
                        style="
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            margin: 0;
                            padding: 20px;
                            font-family: 'ProximaNova', sans-serif;
                            height: 100% !important;
                        "
                    >
                        <div class="main">
                            <p
                                style="
                                    text-align: left;
                                    -webkit-text-size-adjust: 100%;
                                    -ms-text-size-adjust: 100%;
                                    margin-bottom: 30px;
                                    margin-top: 10px;
                                    padding-left: 30px;
                                    padding-right: 30px;
                                "
                            >
                                <img
                                    src="https://www.newsinbullets.app/logo_white.png"
                                    width="95"
                                    alt="NIB Logo"
                                    style="
                                        -ms-interpolation-mode: bicubic;
                                        border: 0;
                                        height: auto;
                                        line-height: 100%;
                                        outline: none;
                                        text-decoration: none;
                                    "
                                />
                            </p>

                            <div
                                class="content"
                                style="
                                    padding: 28px;
                                    background-color: #1e1e1e;
                                    text-align: left;
                                    font-size: 15px;
                                "
                            >
                                <h3>Forgot your password?</h3>

                                <p>Hi there,</p>
                                <p>
                                    You have received this email because you
                                    requested to retrieve your News in Bullets
                                    account. If you believe you have received
                                    this email in error, please contact us at
                                    <a
                                        style="
                                            color: #f7384f;
                                            text-decoration: none;
                                        "
                                        href="mailto:contact@newsinbullets.app"
                                        >contact@newsinbullets.app</a
                                    >
                                </p>
                                <p>
                                    To reset your password, use the code
                                    below in the app:
                                </p>

                                <p
									style="
                                        text-decoration: none;
                                        color: #f7384f;
                                        border-radius: 5px;
                                        display: block;
                                        text-align: center;
                                        padding: 19px;
                                        font-weight: 500;
                                        letter-spacing: 10px;
										font-size: 30px
                                    "
								>
                                    ${code}
                                </p>

                                <p>
                                    Or click the link below:
                                </p>

                                <p>
                                    <a 
                                        style="
                                            text-decoration: none;
                                            color: #f7384f;
                                            display: block;
                                            font-weight: 500;
                                            font-size: 15px
                                        " 
                                        href=${BASE_URL+"/password-reset"}?email=${email}&code=${code}>
                                        ${BASE_URL+"/password-reset"}?email=${email}&code=${code}
                                    </a>
                                </p>
                                <p>This code and link will expire in 10 minutes.</p>

                                <p>
                                    --<br />
                                    The News in Bullets Team
                                </p>
                            </div>

                            <div
                                style="
                                    padding-left: 30px;
                                    padding-right: 30px;
                                    padding-top: 30px;
                                "
                            >
                                <table style="width: 100%">
                                    <tr>
                                        <td style="width: 50%">
                                            <span class="outer_link">
                                                <a
                                                    href="https://www.newsinbullets.app/terms"
                                                    >Terms</a
                                                >
                                            </span>
                                            <span class="outer_link">
                                                <a
                                                    href="https://www.newsinbullets.app/privacy"
                                                    >Privacy</a
                                                >
                                            </span>
                                        </td>
                                        <td
                                            style="
                                                width: 50%;
                                                text-align: right;
                                            "
                                        >
                                            <a href="" target="_blank">
                                                <img
                                                    src="https://www.newsinbullets.app/mail/android.png"
                                                    alt=""
                                                />
                                            </a>
                                            <a
                                                href=""
                                                target="_blank"
                                                style="padding-left: 8px"
                                            >
                                                <img
                                                    src="https://www.newsinbullets.app/mail/ios.png"
                                                    alt=""
                                                />
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <div
                                style="
                                    padding-left: 30px;
                                    padding-right: 30px;
                                    padding-top: 31px;
                                "
                            >
                                <table style="width: 100%">
                                    <tr>
                                        <td>
                                            <span class="sm_link">
                                                <a
                                                    href="https://www.instagram.com/newsinbullets_app/"
                                                    target="_blank"
                                                >
                                                    <img
                                                        src="https://www.newsinbullets.app/mail/ig.png"
                                                        alt=""
                                                    />
                                                </a>
                                            </span>
                                            <span class="sm_link">
                                                <a
                                                    href="https://www.facebook.com/officialnewsinbullets/"
                                                    target="_blank"
                                                >
                                                    <img
                                                        src="https://www.newsinbullets.app/mail/fb.png"
                                                        alt=""
                                                    />
                                                </a>
                                            </span>
                                            <span class="sm_link">
                                                <a
                                                    href="https://www.youtube.com/channel/UCAouHcHjTMJhZAE1E5tdjSg"
                                                    target="_blank"
                                                >
                                                    <img
                                                        src="https://www.newsinbullets.app/mail/yt.png"
                                                        alt=""
                                                    />
                                                </a>
                                            </span>
                                            <span class="sm_link">
                                                <a
                                                    href="https://twitter.com/newsinbullets_"
                                                    target="_blank"
                                                >
                                                    <img
                                                        src="https://www.newsinbullets.app/mail/tw.png"
                                                        alt=""
                                                    />
                                                </a>
                                            </span>
                                            <span class="sm_link">
                                                <a
                                                    href="https://www.tiktok.com/@newsinbullets"
                                                    target="_blank"
                                                >
                                                    <img
                                                        src="https://www.newsinbullets.app/mail/tt.png"
                                                        alt=""
                                                    />
                                                </a>
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </center>
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
  emailPasscodeTemplate
}