const sliderRightBtn = document.querySelector(".slider-btn-right");
const sliderLeftBtn = document.querySelector(".slider-btn-left");
const slider = document.querySelector(".slider-move");
const sliderOut = document.querySelector(".slider-out");
const img = document.querySelectorAll(".img");
const articles = document.querySelector(".articles");
const infoInside = document.querySelector(".info-inside");

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
    const sliderWidth = sliderOut.getBoundingClientRect().width;
    if(sliderWidth === 340){
        let amount = slideState * 360 * -1;
        root.style.setProperty('--slider-x', amount + "px");
    } else {
        let amount = slideState * (sliderWidth+20) * -1;
        root.style.setProperty('--slider-x', amount + "px");
    }
}

function throttle (func, limit) {
    let lastFunc;
    let lastRan;
    return function () {
        const context = this;
        const args = arguments;
        if(!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc)
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan))
        }
    }
}

let maxLimit = throttle(function() {
    if (window.pageYOffset > 150){
        articles.style.opacity = "1";
    }
    if (window.pageYOffset > 670){
        infoInside.style.opacity = "1";
    }
}, 200);

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

document.addEventListener("scroll", maxLimit);
