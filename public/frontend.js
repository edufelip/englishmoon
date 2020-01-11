// var lis = document.querySelectorAll("li");

// for (var i = 0; i < lis.length; i++) {
//     lis[i].addEventListener("mouseover", function (){
//         this.style.background = "pink";
//     });
// }
// for (var i = 0; i < lis.length; i++) {
//     lis[i].addEventListener("mouseout", function (){
//         this.style.background = "white";
//     });
// }

// let body = document.querySelector(".main");
// body.addEventListener("mouseover", () => {
//     body.style.background = "black";
// })

let hamb = document.querySelector(".hamb-bars");
let actHamb = document.querySelector(".act-hamb-bars");
let dropMenu = document.querySelector(".drop-menu");
let shadow = document.querySelector(".shadow");
let tinyLog = document.querySelector(".log2");
let regularLog = document.querySelector(".regular-log");
let dropAut = document.querySelector(".dropdown-aut");
let body = document.querySelector(".main");
let logo = document.querySelector(".logo");
let options = document.querySelector(".options");
let search = document.querySelector(".search");

let dropFadeOut = () => {
    dropMenu.classList.toggle("drop-translate");
    shadow.style.opacity = "0";
    setTimeout( () => {
        shadow.style.visibility = "hidden";
    }, 300);
}
let dropFadeIn = () => {
    dropMenu.classList.toggle("drop-translate");
    shadow.style.opacity = "1";
    shadow.style.visibility = "visible";
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
    // let rect = dropMenu.getBoundingClientRect().left;
    dropFadeIn();
})
actHamb.addEventListener("click", () => {
    dropFadeOut();
})
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


