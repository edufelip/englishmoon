const btn = document.querySelector("#submitButton");
const inputs = document.querySelectorAll(".input")
const icons = document.querySelectorAll(".fas.fa-exclamation");
const secTwo = document.querySelector(".register-main-sectionTwo").querySelector("form")
const regSuc = document.querySelector(".register-success")

const isLocal = window.location.href.indexOf('://localhost')
const linkTo = (isLocal > 0) ? 'http://localhost:3333' : 'https://englishmoon.com.br'

btn.onclick = (evt) => {
    let gender = (inputs[1].checked == true)? inputs[1].value : (inputs[2].checked == true)? inputs[2].value : '';
    const data = {
        "name": inputs[0].value,
        "gender": gender,
        "birthday": inputs[3].value,
        "telephone": inputs[4].value,
        "email": inputs[5].value,
        "password": inputs[6].value,
        "passwordConfirm": inputs[7].value
    }
    fetch(`${linkTo}/users`, {
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
        console.log(data)
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
        icons[0].style.opacity = (data.errorName) ? "1" : "0"
        icons[1].style.opacity = (data.errorGender) ? "1" : "0"
        icons[2].style.opacity = (data.errorBirth) ? "1" : "0"
        icons[3].style.opacity = (data.errorTelephone) ? "1" : "0"
        icons[4].style.opacity = (data.errorEmailWrong || data.errorEmailUsed) ? "1" : "0"
        icons[5].style.opacity = (data.errorPassword) ? "1" : "0"
        icons[6].style.opacity = (data.errorPasswordConfirm) ? "1" : "0"
        return data
    })
    .catch( (err) => {
        console.log(err);
    })
    return false;
}
