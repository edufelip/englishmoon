const sliderRightBtn = document.querySelector(".slider-btn-right");
const sliderLeftBtn = document.querySelector(".slider-btn-left");
const slider = document.querySelector(".slider-move");
const img = document.querySelectorAll(".img");

let slideState = 0;

const toggleBtn = () => {
    if(slideState === 3){
        sliderRightBtn.style.opacity = "1";
    } 
    if(slideState === 2) {
        sliderRightBtn.style.opacity = "0.4";
    }
    if(slideState === 1){
        sliderLeftBtn.style.opacity = "0.4";
    }
    if(slideState === 0){
        sliderLeftBtn.style.opacity = "1";
    }
}

const slide = () => {
    let amount = slideState * 360 * -1;
    root.style.setProperty('--slider-x', amount + "px");
}

sliderRightBtn.addEventListener("click", () => {
    if (slideState < 3){
        if((slideState === 2) || (slideState === 0)) toggleBtn();
        slideState++;
        slide();
    }
});
sliderLeftBtn.addEventListener("click", () => {
    if(slideState > 0){
        if((slideState === 1) || (slideState === 3)) toggleBtn();
        slideState--;
        slide();
    }
});
