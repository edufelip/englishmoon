const form = document.querySelector(".forgotBlock__form")
const bar = document.querySelector(".forgotStatus")
const emailBlock = document.querySelector(".forgotBlock__inputEmail")
const fadeOutBlock = document.querySelector(".forgotBlock__opacityBundle")
const fadeInBlock = document.querySelector(".forgotBlock__opacityBundle-success")

form.addEventListener("submit", submitFunc)

// function submitFunc(event) {
//     event.preventDefault()
//     const email = emailBlock.value
//     const captcha = document.querySelector("#g-recaptcha-response").value

    // fetch("/forgot_password", {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json, text/plain, */*',
    //         'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify({email:email, captcha:captcha})
    // }).then((response) => {
    //     return response.json()
    // }).then((data) => {
    //     console.log(data)
    //     if(data.status === false && data.msg == "Não existe usuário com esse e-mail"){
    //         emailBlock.style.border = "1px solid red"
    //     } else if(data.status === true) {
    //         bar.style.backgroundSize = '200% 100%'
    //         fadeOutBlock.style.opacity = "0"
    //         setTimeout(() => {
    //             fadeOutBlock.style.visibility = "hidden"
    //             fadeInBlock.style.visibility = "visible"
    //             fadeInBlock.style.opacity = "1"
    //         }, 300);
    //     }
    // })
// }