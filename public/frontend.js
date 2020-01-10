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

hamb.addEventListener("click", () => {
    // let rect = dropMenu.getBoundingClientRect().left;
    dropMenu.classList.toggle("drop-translate");
    // shadow.classList.add("activate-shadow");
    shadow.style.width = "100vw";
    shadow.style.background = "#00000030";

})
actHamb.addEventListener("click", () => {
    dropMenu.classList.toggle("drop-translate");
    // shadow.classList.remove("activate-shadow");
    shadow.style.background = "#00000030";
    shadow.style.width = "0vw";
})
