const changePass = document.querySelectorAll(".changePass");
const exclam = document.querySelectorAll(".passInput");
const passBtn = document.querySelector(".passBtn");
const message = document.querySelector(".errorMessage");

passBtn.onclick = (evt) => {
    const data = {
        "oldPassword": exclam[0].value,
        "newPassword": exclam[1].value,
        "newPasswordAgain": exclam[2].value
    }
    fetch('http://localhost:3000/profile/password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data)
        message.style.opacity = "1"
        message.innerHTML = data.msg;
        if(data.id == 1){
            exclam[1].style.outline = "1px solid red"
        }
        if(data.id == 2){
            exclam[1].style.outline = "1px solid red"
            exclam[2].style.outline = "1px solid red"
        }
        if(data.id == 3){
            exclam[0].style.outline = "1px solid red"
        }
        if(data.id == 4){
            message.style.color = "green"
        }
    })
    return false
}

for(let i = 0; i < changePass.length; i++){
    changePass[i].addEventListener("keyup", () => {
        if((i == 0) && changePass[i].value.length < 6) {
            exclam[i+1].style.outline = "1px solid #FF000090"
        } else {
            exclam[i+1].style.outline = "none"
        }
    })
}