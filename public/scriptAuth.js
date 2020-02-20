const field = document.querySelector("#field");
const birth = document.querySelector("#birth");
const btn = document.querySelector("#submitButton");
const inputs = document.querySelectorAll(".input")
const icons = document.querySelectorAll(".fas.fa-exclamation");
const secTwo = document.querySelector(".register-main-sectionTwo").querySelector("form")
const regSuc = document.querySelector(".register-success")

btn.onclick = (evt) => {
    let gender = (inputs[1].checked == true)? inputs[1].value : (inputs[2].checked == true)? inputs[2].value : '';
    const data = {
        "name": inputs[0].value,
        "gender": gender,
        "birthday": inputs[3].value,
        "telephone": inputs[4].value,
        "email": inputs[5].value,
        "password": inputs[6].value,
    }
    fetch('http://localhost:3000/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        if(data.id){
            secTwo.style.opacity = "0";
            setTimeout(() => {
                secTwo.style.display = "none"
                setTimeout(() => {
                    regSuc.style.display = "flex";
                    regSuc.style.opacity = "1";
                }, 100)
            }, 400);
        }
        icons[0].style.opacity = (data.name) ? "1" : "0"
        icons[1].style.opacity = (data.gender) ? "1" : "0"
        icons[2].style.opacity = (data.birth) ? "1" : "0"
        icons[3].style.opacity = (data.telephone) ? "1" : "0"
        icons[4].style.opacity = (data.emailWrong || data.emailUsed) ? "1" : "0"
        icons[5].style.opacity = (data.password) ? "1" : "0"
        return data
    })
    .catch( (err) => {
        console.log(err);
    })
    return false;
}

let fieldConfirm = true;
let keyConfirm = (evt) => {
    return ((evt.keyCode >= 48 && evt.keyCode <= 57) || (evt.keyCode >= 96 && evt.keyCode <= 105) || evt.key == "Backspace" || evt.key == "Enter" || evt.key == "Tab" || evt.key == "F5" || evt.keyCode == 37 || evt.keyCode == 39)
}
let keyNumberConfirm = (evt) => {
    return ((evt.keyCode >= 48 && evt.keyCode <= 57) || (evt.keyCode >= 96 && evt.keyCode <= 105))
}

field.onkeydown = (evt) => {
    if(evt.key == "Backspace"){
        if (field.value.length == 5) {
            field.value = field.value.substr(1, 2);
        }
    }
    return keyConfirm(evt);
}

field.onkeyup = (evt) => {
    if ((field.value.length === 2) && evt.key != "Backspace") field.value = "(" + field.value + ") "
}

birth.onkeyup = (evt) => {
    if ((birth.value.length === 2) && evt.key != "Backspace") birth.value = birth.value + "/"
    if ((birth.value.length === 5) && evt.key != "Backspace") birth.value = birth.value + "/"
}