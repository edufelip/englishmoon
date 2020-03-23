const nodemailer = require('nodemailer')
const secret = require("../config/data_credentials")

// const transporter = nodemailer.createTransport({
//     host: //smtp.tal
//     port: 25,
//     auth: {
//         user: user,
//         pass: pass
//     },
//     secure: false, // true for 465
//     tls: {rejectUnauthorized: false}
// })
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: secret.email.user,
        pass: secret.email.pass
    }
});

module.exports = transporter;