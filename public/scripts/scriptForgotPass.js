const form = document.querySelector(".forgotBlock__form")
const bar = document.querySelector(".forgotStatus")
const emailBlock = document.querySelector(".forgotBlock__inputEmail")
const fadeOutBlock = document.querySelector(".forgotBlock__opacityBundle")
const fadeInBlock = document.querySelector(".forgotBlock__opacityBundle-success")
const sendBtn = document.querySelector(".forgotBlock__button")
const load = document.querySelector(".forgotBlock__load")
const doneTitle = document.querySelector(".forgotBlock__doneTitle")
const doneMsg = document.querySelector(".forgotBlock__doneMessage")

form.addEventListener("submit", submitFunc)

function submitFunc(event) {
    event.preventDefault()
    const email = emailBlock.value
    const captcha = document.querySelector("#g-recaptcha-response").value
    if(!captcha){
        alert('Confirme o ReCaptcha')
        return false
    }
    sendBtn.style.opacity = "0"
    setTimeout(() => {
        sendBtn.style.display = "none"
        load.style.display = "flex"
        load.style.opacity = "1"
    }, 300);
    fetch("/forgot_password", {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({email:email, captcha:captcha})
    }).then((response) => {
        return response.json()
    }).then((data) => {
        load.style.visibility = "hidden"
        fadeOutBlock.style.transform = "translateX(-150px)"
        fadeOutBlock.style.opacity = "0"
        setTimeout(() => {
            fadeOutBlock.style.visibility = "hidden"
            fadeInBlock.style.visibility = "visible"
            fadeInBlock.style.opacity = "1"
            fadeInBlock.style.transform = "translateX(0px)"
        }, 400);
        bar.style.backgroundSize = '200% 100%'
        if(data.status === false && data.msg == "Não existe usuário com esse e-mail"){
            doneTitle.innerHTML = "Me desculpe"
            doneMsg.innerHTML = "Não foi possível encontrar um usuário cadastrado com esse e-mail, por favor clique em 'recomeçar' e insira o e-mail correto"          
        } else if(data.status === true) {
            doneTitle.innerHTML = "Tudo certo"
            doneMsg.innerHTML = "Você receberá um e-mail com um link para a redefinição de sua senha! Pode demorar até 5 minutos para receber o e-mail, não esqueça de verificar a caixa de spam"
        }
    })
}