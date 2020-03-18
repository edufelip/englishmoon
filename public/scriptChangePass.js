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
        message.style.opacity = "1"
        message.innerHTML = data.msg;
        exclam[0].style.outline = data.id == 3 ? "1px solid red" : "none"
        exclam[1].style.outline = data.id == 1 || data.id == 2 ? "1px solid red" : "none"
        exclam[2].style.outline = data.id == 2 ? "1px solid red" : "none"
        if(data.id == 4){
            message.style.color = "green"
            setTimeout(() => {
                window.location.replace("http://localhost:3000/profile/info")
            }, 2000);
        }
    })
    return false
}
