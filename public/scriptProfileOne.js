const optOne = document.querySelector(".yourInfo")
const optionBtn = document.querySelectorAll(".profileContainer")
const optionBar = document.querySelectorAll(".info-active-bar")
const edit = document.querySelectorAll(".edit")
const fields = document.querySelectorAll("span")
const sup = document.querySelectorAll(".editField")
const alt = document.querySelector(".sub-form")
const fieldsEdit = [sup[0], alt, sup[1], sup[2]]
const check = document.querySelectorAll(".fa-check-circle")
const radio = document.querySelectorAll(".radio-input")

console.log(fieldsEdit)

for(let i = 0; i < edit.length; i++){
    edit[i].addEventListener("click", () => {
        fields[i].style.opacity = "0"
        setTimeout(() => {
            fields[i].style.display = "none"
            fieldsEdit[i].style.display = i == 1 ? "flex" : "block";
            fieldsEdit[i].style.opacity = "1";
            radio[0].style.display = "block"
            radio[1].style.display = "block"
        }, 300);
    })
}

for(let i = 0; i < check.length; i++){
    check[i].addEventListener("click", () => {
        
    })
}

optionBar[0].style.visibility = "visible"
optionBtn[0].style.background = "#1f23ab15"