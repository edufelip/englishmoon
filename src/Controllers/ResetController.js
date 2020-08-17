const User = require('../models/User')
const bcrypt = require('bcrypt')
const request = require('request')
const jwt = require('jsonwebtoken')
const transporter = require('../config/mailer')
const saltRounds = 10
require('dotenv').config()

module.exports = {
  async index(req, res) {
    const email = req.body.email
    const check = req.body.captcha
    const user = await User.findOne({
      where: {email: email}
    }).catch(err => console.log(err))
    if(!user) return res.json({'status': false, 'msg': 'Não existe usuário com esse e-mail'})
    
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_KEY}&response=${check}&remoteip=${req.connection.remoteAddress}`
    request(verifyUrl, (err, response, body) => {
      if(err) console.log(err)
      body = JSON.parse(body)
      if(body.success !== undefined && !body.success) return res.json({'status': false, 'msg': 'failed verification'})
    })
    const hashedPass = await bcrypt.hash(user.password, saltRounds)
    const token = jwt.sign({user: user.email, resetHash: hashedPass}, process.env.JWT_SECRET, {expiresIn: 3600})
    const link = `${process.env.NODE_ENV}/reset_password?cd=${token}`
    const mail = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Recupere sua senha',
      template: 'passResetEmail',
      context: {link}
    }
    transporter.sendMail(mail).then((response)=>{
      return res.json({'status': true, 'msg': 'captcha passed'})
    })
  }
}