const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const saltRounds = 10;

const checkEmail = (mail) => {
  let check = false;
  if(!mail) {
    return check
  } else {
    let detach = mail.split('');
    let final = detach.slice(detach.length-4, detach.length);
    final = final.join('');
    if (final != '.com'){
      return false;
    } else {
      for(let i = 1; i < detach.length; i++){
        if (detach[i] === "@") {
          check = true;
        }
      }
      return check;
    }
  }
}
const checkPass = (pass) => {
  let check = true;
  if(!pass){
    check = false;
    return check;
  } else {
    let detach = pass.split('');
    if(detach.length < 6){
      check = false;
    }
    return check;
  }
}
const checkTel = (tel) => {
  let check = true;
  if(!tel){
    check = false;
    return check;
  }else {
    let detach = tel.split('');
    if(detach[0] != '(' || detach[3] != ')' || detach[4] != ' ' || !tel) check = false;
    return check;
  }
}
const checkBirth = (date) => {
  let check = true;
  if(!date){
    check = false;
    return check;
  } else {
    let detach = date.split('');
    if(detach[2] != '/' || detach[5] != '/' || !date) check = false;
    return check;
  }
}

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const { name, gender, birthday, telephone, email, password } = req.body;
    
    const foundUserName = (name) ? await User.findOne({
      where: {name: name}
    }) : null;
    const foundUserEmail = (email) ? await User.findOne({
      where: {email: email}
    }) : null;

    const errorName = foundUserName || !name;
    const errorGender = !gender;
    const errorBirth = !checkBirth(birthday);
    const errorTelephone = !checkTel(telephone);
    const errorEmailWrong = !checkEmail(email);
    const errorEmailUsed = foundUserEmail;
    const errorPassword = !checkPass(password);

    let problems = {
      'name': errorName,
      'gender': errorGender,
      'birth': errorBirth,
      'telephone': errorTelephone,
      'emailWrong': errorEmailWrong,
      'emailUsed': errorEmailUsed,
      'password': errorPassword
    }

    if (errorName || errorGender || errorBirth || errorTelephone || errorEmailUsed || errorEmailWrong || errorPassword){
      return res.json(problems);
    } else {
      const hash = await bcrypt.hash(password, saltRounds);
      const user = await User.create(Object.assign(req.body, {password : hash}));
      return res.json(user);
    }
  }
};