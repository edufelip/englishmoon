const nodemailer = require('nodemailer')
require('dotenv').config()

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
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

module.exports = transporter;