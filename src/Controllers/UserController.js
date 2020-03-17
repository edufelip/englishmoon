const User = require('../models/User');
const bcrypt = require('bcrypt');
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
    const { name, gender, birthday, telephone, email, password, passwordConfirm } = req.body;
    
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
    const errorPasswordConfirm = password === passwordConfirm ? false : true;

    let problems = {
      'name': errorName,
      'gender': errorGender,
      'birth': errorBirth,
      'telephone': errorTelephone,
      'emailWrong': errorEmailWrong,
      'emailUsed': errorEmailUsed,
      'password': errorPassword,
      'passwordConfirm' : errorPasswordConfirm
    }

    if (errorName || errorGender || errorBirth || errorTelephone || errorEmailUsed || errorEmailWrong || errorPassword || errorPasswordConfirm){
      return res.json(problems);
    } else {
      const hash = await bcrypt.hash(password, saltRounds);
      const user = await User.create(Object.assign(req.body, {password : hash}));
      return res.json(user);
    }
  },

  async edit(req, res) {
    const { name, gender, birthday, telephone, email } = req.body;
    const user = await User.findOne({
      where: {email: email}
    })
    user.name = name;
    user.gender = gender;
    user.birthday = birthday;
    user.telephone = telephone;
    user.email = email;
    await user.save();
    return res.redirect("/profile/info");
  },
  
  async destroy(req, res) {
    const { email } = req.body
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
    const verifyOld = bcrypt.compareSync(oldPass, currentUser.password)
    if(!verifyOld) {
      const status = new Status(3, "A senha antiga está incorreta")
      return res.json(status)
    }
    const user = await User.findOne({
      where: {email: currentUser.email}
    })
    const hash = await bcrypt.hash(newPass, saltRounds);
    user.password = hash;
    user.save();
    const status = new Status(4, "A senha foi alterada com sucesso");
    return res.json(status)
  }
};