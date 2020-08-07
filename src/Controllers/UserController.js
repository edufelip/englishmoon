const User = require('../models/User')
const bcrypt = require('bcrypt')
const fs = require('fs')
const jwt = require("jsonwebtoken")
const saltRounds = 10
const transporter = require('../config/mailer')
const check = require('../utils/checkFunctions')
require('dotenv').config()

module.exports = {
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

    Object.keys(problems).forEach(key => {
      if(problems[key]) return res.json(problems)
    })
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
    
  },

  async update(req, res) {
    if (req.body.CASE === '@UPDATE/ALL') {
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
    }
    if (req.body.CASE === '@UPDATE/PHOTO') {
      const email = req.user.email
      const user = await User.findOne({
        where: {email: email}
      })
      if(user.photo){
        const path = "public/uploads/" + user.photo
        try {
          fs.unlinkSync(path)
        } catch(err) {
          console.log(err)
        }
      }
      user.photo = req.file.filename
      await user.save()
      return res.redirect("/profile/info")
    }
    if (req.body.CASE === '@UPDATE/PASSWORD') {
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
    }
    if (req.body.CASE === '@UPDATE/RESET_PASS') {
      const {token, password} = req.body
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if(err) return res.status(400).send({error: err})
        const user = await User.findOne({
          where: {email: decoded.user}
        })
        if(!bcrypt.compareSync(user.password, decoded.resetHash)) return res.status(400).send({error: 'Invalid Token'})
        const newPass = await bcrypt.hash(password, saltRounds)
        user.password = newPass
        await user.save()
        const mail = {
          to: user.email,
          from: 'eduardofelipi@gmail.com',
          subject: 'Senha alterada com sucesso',
          template: 'resetDoneEmail'
        }
        transporter.sendMail(mail)
        return res.redirect('/')
      })
    }
  },
  
  async delete(req, res) {
    const email = req.user.email
    const user = await User.findOne({
      where: {email: email}
    })
    await user.destroy();
    return res.redirect("/")
  },
};