const body = document.querySelector("body");
const header = document.querySelector(".header");
const main = document.querySelector(".main");
const actHamb = document.querySelectorAll(".act-hamb-bars");
const hamb = document.querySelector(".hamb-bars");
const shadow = document.querySelector(".shadow");
const tinyLog = document.querySelector(".log2");
const regularLog = document.querySelector(".regular-log");
const dropAut = document.querySelector(".dropdown-aut");
const logo = document.querySelector(".logo");
const options = document.querySelector(".options");
const search = document.querySelector(".search");
const dropMenuDesk = document.querySelector("#dropmenu_desk");
const dropMenuMob = document.querySelector("#dropmenu_mobile");
const searchButton = document.querySelector(".search-sup");
const searchTiny = document.querySelector(".search-tiny");
const cancel = document.querySelector(".fa-times");

let faded = 0;
const dropFadeOut = () => {
    faded = 0;
    body.style.overflow = "scroll";
    shadow.style.opacity = "0";
    dropMenuDesk.classList.toggle("drop-translate");
    setTimeout( () => {
        shadow.style.visibility = "hidden";
    }, 300);
    dropMenuMob.style.visibility = "hidden";
}
const dropFadeIn = () => {
    faded = 1;
    body.style.overflow = "hidden";
    shadow.style.opacity = "1";
    dropMenuDesk.classList.toggle("drop-translate");
    shadow.style.visibility = "visible";
    dropMenuMob.style.visibility = "visible";
}

const changeAut = () => {
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
const neutralizeAut = () => {
    if(dropAut.style.visibility == "visible") {
        dropAut.style.opacity = "0";
        setTimeout( () => {
            dropAut.style.visibility = "hidden";
        }, 200);
    }
}

hamb.addEventListener("click", () => {
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
document.onkeydown = function(evt) {
    if ((evt.key === "Escape") && faded) dropFadeOut();
};

tinyLog.addEventListener("click", () => {
    changeAut();
})
regularLog.addEventListener("click", () => {
    changeAut();
})
main.addEventListener("click", () => {
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

// Header hide and show
let root = document.documentElement;
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset;
    let top = header.getBoundingClientRect().top;
    let dif = top - (scrollTop - lastScrollTop);
    if (scrollTop > lastScrollTop) {
        root.style.setProperty('--position-y', dif + "px");
    } else {
        root.style.setProperty('--position-y', dif + "px");
    }
    if (header.getBoundingClientRect().top < -65) root.style.setProperty('--position-y', -65 + "px")
    if (header.getBoundingClientRect().top > 0) root.style.setProperty('--position-y', 0 + "px")
    lastScrollTop = scrollTop;
});

