const form = document.querySelector(".forgotBlock__form")

form.addEventListener("submit", submitFunc)

function submitFunc(event) {
    event.preventDefault()
    const email = document.querySelector(".forgotBlock__email").value
    const captcha = document.querySelector("#g-recaptcha-response").value

    fetch("/verify", {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({email:email, captcha:captcha})
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
    })
}