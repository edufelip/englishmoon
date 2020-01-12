let actHamb = document.querySelectorAll(".act-hamb-bars");
let hamb = document.querySelector(".hamb-bars");
let shadow = document.querySelector(".shadow");
let tinyLog = document.querySelector(".log2");
let regularLog = document.querySelector(".regular-log");
let dropAut = document.querySelector(".dropdown-aut");
let body = document.querySelector(".main");
let logo = document.querySelector(".logo");
let options = document.querySelector(".options");
let search = document.querySelector(".search");
let dropMenuDesk = document.querySelector("#dropmenu_desk");
let dropMenuMob = document.querySelector("#dropmenu_mobile");
let searchButton = document.querySelector(".search-sup");
let searchTiny = document.querySelector(".search-tiny");
let cancel = document.querySelector(".fa-times");

let dropFadeOut = () => {
    dropMenuDesk.classList.toggle("drop-translate");
    shadow.style.opacity = "0";
    setTimeout( () => {
        shadow.style.visibility = "hidden";
    }, 300);
    dropMenuMob.style.visibility = "hidden";
}
let dropFadeIn = () => {
    dropMenuDesk.classList.toggle("drop-translate");
    shadow.style.opacity = "1";
    shadow.style.visibility = "visible";
    dropMenuMob.style.visibility = "visible";
}

let changeAut = () => {
    if(dropAut.style.visibility == "visible") {
        dropAut.style.opacity = "0";
        setTimeout( () => {
            dropAut.style.visibility = "hidden";
        }, 200);
    } else {
        dropAut.style.visibility = "visible";
        dropAut.style.opacity = "1";
    }
}
let neutralizeAut = () => {
    if(dropAut.style.visibility == "visible") {
        dropAut.style.opacity = "0";
        setTimeout( () => {
            dropAut.style.visibility = "hidden";
        }, 200);
    }
}

hamb.addEventListener("click", () => {
    // let rect = dropMenuDesk.getBoundingClientRect().left;
    dropFadeIn();
})
for(let i = 0; i < actHamb.length; i++){
    actHamb[i].addEventListener("click", () => {
        dropFadeOut();
    })
}
shadow.addEventListener("click", () => {
    dropFadeOut();
})

tinyLog.addEventListener("click", () => {
    changeAut();
})
regularLog.addEventListener("click", () => {
    changeAut();
})
body.addEventListener("click", () => {
    neutralizeAut();
})
logo.addEventListener("click", () => {
    neutralizeAut();
})
options.addEventListener("click", () => {
    neutralizeAut();
})
search.addEventListener("click", () => {
    neutralizeAut();
})

searchButton.addEventListener("click", () =>{
    searchButton.classList.toggle("search-translate");
    tinyLog.style.opacity = "0";
    setTimeout( () => {
        tinyLog.style.visibility = "hidden";
    }, 200);
    searchTiny.style.visibility = "visible";
    searchTiny.style.opacity = "1";
    logo.style.visibility = "hidden";
    logo.style.opacity = "0";
})
cancel.addEventListener("click", () => {
    searchTiny.style.opacity = "0";
    searchTiny.style.visibility = "hidden";
    logo.style.visibility = "visible";
    logo.style.opacity = "1";
    searchButton.classList.toggle("search-translate");
    tinyLog.style.opacity = "1";
    tinyLog.style.visibility = "visible";
})


