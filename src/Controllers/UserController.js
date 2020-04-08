const User = require('../models/User');
const bcrypt = require('bcrypt');
const fs = require('fs');
const request = require("request");
const jwt = require("jsonwebtoken")
const saltRounds = 10;
const transporter = require('../config/mailer');
const check = require('../config/checkFunctions')
const secret = require('../config/data_credentials')


module.exports = {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },

  async store(req, res) {
    const { name, gender, birthday, telephone, email, password, passwordConfirm } = req.body;
    
    const foundUserName = (name) ? await User.findOne({
      where: {name: name}
    }) : null;
    const foundUserEmail = (email) ? await User.findOne({
      where: {email: email}
    }) : null;

    const problems = {}
    problems.errorName = foundUserName || !name; 
    problems.errorGender = !gender;
    problems.errorBirth = !check.checkBirth(birthday);
    problems.errorTelephone = !check.checkTel(telephone);
    problems.errorEmailWrong = !check.checkEmail(email);
    problems.errorEmailUsed = foundUserEmail ? true : false;
    problems.errorPassword = !check.checkPass(password);
    problems.errorPasswordConfirm = password === passwordConfirm ? false : true;

    const {errorName, errorGender, errorBirth, errorTelephone, errorEmailWrong, errorEmailUsed, errorPassword, errorPasswordConfirm} = problems

    if (errorName || errorGender || errorBirth || errorTelephone || errorEmailUsed || errorEmailWrong || errorPassword || errorPasswordConfirm){
      return res.json(problems);
    } else {
      const hash = await bcrypt.hash(password, saltRounds);
      const user = await User.create(Object.assign(req.body, {password : hash}));
      const mail = {
        from: 'eduardofelipi@gmail.com',
        to: email,
        subject: 'Bem-vindo à EnglishMoon',
        template: 'registerEmail'
      }
      transporter.sendMail(mail).then(console.log).catch(console.error)
      const response = {id: "true"}
      return res.json(response);
    }
  },

  async edit(req, res) {
    const { name, gender, birthday, telephone, email } = req.body;
    const user = await User.findOne({
      where: {email: email}
    })
    user.name = name;
    user.gender = gender;
    if(check.checkBirth(birthday)) user.birthday = birthday;
    if(check.checkTel(telephone)) user.telephone = telephone;
    if(check.checkEmail(email)) user.email = email;
    await user.save();
    return res.redirect("/profile/info");
  },
  
  async destroy(req, res) {
    const email = req.user.email
    const user = await User.findOne({
      where: {email: email}
    })
    await user.destroy();
    return res.redirect("/")
  },

  async changePassword(req, res) {
    function Status(id, msg){
      this.id = id;
      this.msg = msg
    }
    const {oldPassword, newPassword, newPasswordAgain} = req.body
    if(newPassword.length < 6) {
      const status = new Status(1, "A senha deve conter no mínimo 6 caracteres")
      return res.json(status);
    }
    if(newPassword != newPasswordAgain) {
      const status = new Status(2, "As senhas diferem")
      return res.json(status)
    }
    const currentUser = req.user;
    const verifyOld = bcrypt.compareSync(oldPassword, currentUser.password)
    if(!verifyOld) {
      const status = new Status(3, "A senha antiga está incorreta")
      return res.json(status)
    }
    const user = await User.findOne({
      where: {email: currentUser.email}
    })
    const hash = await bcrypt.hash(newPassword, saltRounds);
    user.password = hash;
    user.save();
    const status = new Status(4, "Sua senha foi alterada com sucesso");
    return res.json(status)
  },

  async changePhoto(req, res) {
    const email = req.user.email
    const user = await User.findOne({
      where: {email: email}
    })
    if(user.photo){
      const path = "uploads/" + user.photo
      try {
        fs.unlinkSync(path)
      } catch(err) {
        console.log(err)
      }
    }
    user.photo = req.file.filename
    await user.save()
    return res.redirect("/profile/info")
  },

  async verifyPass(req, res){
    const userPass = req.user.password
    const bodyPass = req.body.password
    const verify = bcrypt.compareSync(bodyPass, userPass)
    return res.json(verify)
  },

  async verifyEmailAndCaptcha(req, res){
    const email = req.body.email
    const user = await User.findOne({
      where: {email: email}
    })
    .catch(err => console.log(err))
    
    if(!user) return res.json({'status': false, 'msg': 'Não existe usuário com esse e-mail'})
    const ver = req.body.captcha
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secret.captcha.key}&response=${ver}&remoteip=${req.connection.remoteAddress}`
    request(verifyUrl, (err, response, body) => {
        if(err) console.log(err)
        body = JSON.parse(body)
        if(body.success !== undefined && !body.success) return res.json({'status': false, 'msg': 'failed verification'})
        const info = {
          user: user.email,
          pass: user.password
        }
        const token = jwt.sign({info}, secret.jwt.secret, {expiresIn: 3600})
        const link = `http://localhost:3000/reset_password?cd=${token}`
        const mail = {
          to: email,
          from: 'eduardofelipi@gmail.com',
          subject: 'Recupere sua senha',
          template: 'passResetEmail',
          context: {link}
        }
        transporter.sendMail(mail).then((response)=>{
          return res.json({'status': true, 'msg': 'captcha passed'})
        })
    })
  },

  async resetPass(req, res){
    const token = req.query.cd
    const decoded = jwt.verify(token, secret.jwt.secret)
    if(!decoded) return res.status(400).send({error: 'Token invalido'})
    const user = await User.findOne({
      where: {email: decoded.info.user}
    })
    if(user.password !== decoded.info.pass) return res.status(400).send({error: "Token invalido"})
    return res.render("resetPass", {email: decoded.user})
  },

  async newPass(req, res){
    
  }
};