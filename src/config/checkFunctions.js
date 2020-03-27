module.exports = {
    checkEmail(mail) {
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
      },

      checkPass(pass) {
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
      },

      checkTel(tel) {
        let check = true;
        if(!tel){
          check = false;
          return check;
        }else {
          let detach = tel.split('');
          if(detach[0] != '(' || detach[3] != ')' || detach[4] != ' ' || !tel) check = false;
          return check;
        }
      },

      checkBirth(date) {
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
}