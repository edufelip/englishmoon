const body = document.querySelector("body");
const header = document.querySelector(".header");
const main = document.querySelector(".main");
const actHamb = document.querySelectorAll(".act-hamb-bars");
const hamb = document.querySelector(".hamb-bars");
const shadow = document.querySelector(".shadow");
const tinyLog = document.querySelector(".log2");
const tinyLogLoged = document.querySelector(".log2-loged");
const regularLog = document.querySelector(".regular-log");
const dropAut = document.querySelector(".dropdown-aut");
const logo = document.querySelector(".logo");
const options = document.querySelector(".options");
const search = document.querySelector(".search");
const dropMenuDesk = document.querySelector("#dropmenu_desk");
const dropMenuMob = document.querySelector("#dropmenu_mobile");
const searchButton = document.querySelector(".search-sup");
const searchTiny = document.querySelector(".search-tiny");
const cancelSearch = document.querySelector(".cancel-search-tiny");
const cancelAut = document.querySelector(".cancel-dropdown-aut");
const profileBtn = document.querySelector(".profilebtn");
const line = document.querySelectorAll(".line");
const lis = header.querySelectorAll("li");
const signForm = document.querySelector(".form-container");
const signBtn = signForm.querySelector(".signBtn");
const signForms = signForm.querySelectorAll("input");
const profileOpt = document.querySelector(".profile-opt")

for (let i = 0; i < lis.length; i++){
    let anchor = lis[i].querySelector("a");
    anchor.addEventListener("mouseenter", () => {
        line[i].classList.add("lineOn");
        anchor.classList.add("a-black");
    });
}
for (let i = 0; i < lis.length; i++){
    let anchor = lis[i].querySelector("a");
    anchor.addEventListener("mouseout", () => {
        line[i].classList.remove("lineOn");
        anchor.classList.remove("a-black");
    });
}

let faded = 0;
const dropFadeIn = () => {
    faded = 1;
    body.style.overflow = "hidden";
    shadow.style.opacity = "1";
    dropMenuDesk.classList.toggle("drop-translate");
    shadow.style.visibility = "visible";
    dropMenuMob.style.visibility = "visible";
}
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

const changeAut = () => {
    if(dropAut.style.visibility == "visible") {
        dropAut.style.opacity = "0";
        shadow.style.opacity = "0";
        body.style.overflowY = "scroll";
        setTimeout( () => {
            dropAut.style.visibility = "hidden";
            shadow.style.visibility = "hidden";
        }, 200);
    } else {
        dropAut.style.visibility = "visible";
        shadow.style.visibility = "visible";
        dropAut.style.opacity = "1";
        shadow.style.opacity = "1";
        body.style.overflowY = "hidden";
    }
}
const searchOn = () => {
    searchButton.classList.toggle("search-translate");
    if(tinyLog != null){
        tinyLog.style.opacity = "0";
        setTimeout( () => {
            tinyLog.style.visibility = "hidden";
        }, 200);
    }
    searchTiny.style.visibility = "visible";
    searchTiny.style.opacity = "1";
    logo.style.visibility = "hidden";
    logo.style.opacity = "0";
    if(tinyLogLoged != null) tinyLogLoged.style.visibility = "hidden"
    if(profileOpt != null) profileOpt.style.visibility = "hidden"
}
const searchOff = () => {
    searchTiny.style.opacity = "0";
    searchTiny.style.visibility = "hidden";
    logo.style.visibility = "visible";
    logo.style.opacity = "1";
    searchButton.classList.toggle("search-translate");
    if(tinyLog != null){
        tinyLog.style.opacity = "1";
        tinyLog.style.visibility = "visible";
    }
    if(tinyLogLoged != null) tinyLogLoged.style.visibility = "visible"
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
    if(faded){
        dropFadeOut();
    } else {
        changeAut();
    } 
})
document.onkeydown = function(evt) {
    if (evt.key === "Escape"){
        if(faded) dropFadeOut();
        if(dropAut.style.visibility == "visible") changeAut();
    }
};

if(tinyLog != null){
    tinyLog.addEventListener("click", () => {
        changeAut();
    })
}
if(regularLog) {
    regularLog.addEventListener("click", () => {
        changeAut();
    })
}
cancelAut.addEventListener("click", () => {
    changeAut();
})

searchButton.addEventListener("click", () =>{
    searchOn();
})
cancelSearch.addEventListener("click", () => {
    searchOff();
})


// Header hide and show (scroll)
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

let status = false;
if (profileBtn != null) {
    profileBtn.addEventListener("mouseenter", () => {
        profileOpt.style.visibility = "visible";
    })
    profileBtn.addEventListener("mouseleave", () => {
        if(!status){
            profileOpt.style.visibility= "hidden"
        }
    })
}
if (profileOpt != null) {
    profileOpt.addEventListener("mouseenter", () => {
        status = true;
        profileOpt.style.visibility = "visible";
    })
    profileOpt.addEventListener("mouseleave", () => {
        status = false;
        profileOpt.style.visibility= "hidden"
    })
    profileOpt.addEventListener("click", () => {
        profileOpt.style.visibility = profileOpt.style.visibility == "visible" ? "hidden" : "visible"
    })
}
if(tinyLogLoged != null) {
    tinyLogLoged.addEventListener("click", () => {
        profileOpt.style.visibility = profileOpt.style.visibility == "visible" ? "hidden" : "visible"
    })
}