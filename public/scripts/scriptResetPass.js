const resetForm = document.getElementById('reset-form')
const passField = document.querySelector('.type-pass')
const passFieldAgain = document.querySelector('.type-pass-again')
const resetError = document.querySelector('.reset_errorMsg')

resetForm.onsubmit = (e) => {
    e.preventDefault()
    if(passField.value !== passFieldAgain.value ) {
        resetError.innerHTML = "As senhas nao coincidem"
        resetError.classList.add('reset_errorShow')
    } else {
        if(passField.value.length < 6) {
            resetError.innerHTML = "Informe uma senha de no mínimo 6 caracteres"
            resetError.classList.add('reset_errorShow')
        } else {
            resetError.innerHTML = ""   
            resetError.classList.remove('reset_errorShow')
            resetForm.submit()
        }
    }
}