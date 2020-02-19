const User = require('../models/User');

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
    // console.log(foundUserName)
    const errorGender = !gender;
    const errorBirth = !checkBirth(birthday);
    const errorTelephone = !checkTel(telephone);
    const errorEmailWrong = !checkEmail(email);
    const errorEmailUsed = foundUserEmail;
    const errorPassword = !checkPass(password);

    let problems = {
      'nome': errorName,
      'gender': errorGender,
      'birth': errorBirth,
      'telep': errorTelephone,
      'emailWrong': errorEmailWrong,
      'emailUsed': errorEmailUsed,
      'password': errorPassword
    }
    // console.log(problems)

    if (errorName || errorGender || errorBirth || errorTelephone || errorEmailUsed || errorEmailWrong || errorPassword){
      return res.json(problems);
      // return res.render("registerErr", {eName:errorName, eGender:errorGender, eBirth:errorBirth, eTelephone:errorTelephone, eEmailW:errorEmailWrong, eMailU:errorEmailUsed, ePassword:errorPassword})
    } else {
      const user = await User.create({name, gender, birthday, telephone, email, password});
      return res.json(user)
      // let arrayConfirm = true;
      // return res.render("register", {arrayConfirm:arrayConfirm});
    }
  }
};