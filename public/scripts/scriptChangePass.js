const changePass = document.querySelectorAll(".changePass");
const exclam = document.querySelectorAll(".passInput");
const passBtn = document.querySelector(".passBtn");
const message = document.querySelector(".errorMessage");

const isLocal = window.location.href.indexOf('://localhost')
const linkTo = (isLocal > 0) ? 'http://localhost:3333' : 'https://englishmoon.com.br'

passBtn.onclick = (evt) => {
    const data = {
        "CASE": "@UPDATE/PASSWORD",
        "oldPassword": exclam[0].value,
        "newPassword": exclam[1].value,
        "newPasswordAgain": exclam[2].value
    }
    fetch(`${linkTo}/users`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        message.style.opacity = "1"
        message.innerHTML = data.msg;
        exclam[0].style.outline = data.id == 3 ? "1px solid red" : "none"
        exclam[1].style.outline = data.id == 1 || data.id == 2 ? "1px solid red" : "none"
        exclam[2].style.outline = data.id == 2 ? "1px solid red" : "none"
        if(data.id == 4){
            message.style.color = "green"
            setTimeout(() => {
                window.location.replace(`${linkTo}/profile/info`)
            }, 2000);
        }
    })
    .catch((err) => {
        console.log(err)
    })
    return false
}
