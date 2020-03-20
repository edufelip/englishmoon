const optOne = document.querySelector(".yourInfo")
const optionBtn = document.querySelectorAll(".profileContainer")
const optionBar = document.querySelectorAll(".info-active-bar")
const edit = document.querySelectorAll(".edit")
const fields = document.querySelectorAll("span")
const sup = document.querySelectorAll(".editField")
const alt = document.querySelector(".sub-form")
const fieldsEdit = [sup[0], alt, sup[1], sup[2]]
const radio = document.querySelectorAll(".radio-input")
const photoBox = document.querySelector(".box-photo")
const label = document.querySelector("label")
const fileSelect = document.querySelector("#file-select")
const title = document.querySelector("#img-form-title")
const form = document.querySelector("#photo-form")
const imgBtn = document.querySelector("#imgBtn")
const deleteBtn = document.querySelector("#delete-btn")
const deleteForm = document.querySelector(".profile-delete-def")
const profShadow = document.querySelector(".profile-shadow")
const cancel = document.querySelector(".cancel-delete")

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

label.addEventListener("mouseenter", () => {
    label.style.opacity = "0.8"
})
label.addEventListener("mouseleave", () => {
    label.style.opacity = "0.2"
})
photoBox.addEventListener("mouseenter", () => {
    label.style.opacity = "0.8"
})
photoBox.addEventListener("mouseleave", () => {
    label.style.opacity = "0.2"
})

fileSelect.addEventListener("change", () => {
    title.innerHTML = fileSelect.value
    let prov = fileSelect.value;
    let def = []
    let cont = 0
    prov = prov.split('')
    for(let i = 0; i < prov.length; i++){
        if(prov[i] == "\\") cont++;
    }
    for(let i = 0; i < prov.length; i++){
        if(prov[i] == "\\") cont--;
        if(cont == 0) {
            def.push(prov[i])
        }
    }
    def.shift();
    def = def.join('')
    title.innerHTML = def;
    imgBtn.style.visibility = "visible"
    imgBtn.style.opacity = "1"
})

imgBtn.addEventListener("click", () => {
    form.submit()
})

deleteBtn.onclick = (evt) => {
    profShadow.style.visibility = "visible"
    profShadow.style.opacity = "1"
    deleteForm.style.visibility = "visible"
    deleteForm.style.opacity = "1"
    return false
}

cancel.addEventListener("click", () => {
    deleteForm.style.opacity = "0"
    profShadow.style.opacity = "0"
    setTimeout(() => {
        profShadow.style.visibility = "hidden"
        deleteForm.style.visibility = "hidden"
    }, 300);
})
profShadow.addEventListener("click", () => {
    deleteForm.style.opacity = "0"
    profShadow.style.opacity = "0"
    setTimeout(() => {
        profShadow.style.visibility = "hidden"
        deleteForm.style.visibility = "hidden"
    }, 300);
})

optionBar[0].style.visibility = "visible"
optionBtn[0].style.background = "#1f23ab15"

