const field = document.querySelector("#field");
const birth = document.querySelector("#birth");

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