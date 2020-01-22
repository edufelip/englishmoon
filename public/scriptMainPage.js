const sliderRightBtn = document.querySelector(".slider-btn-right");
const sliderLeftBtn = document.querySelector(".slider-btn-left");
const slider = document.querySelector(".slider-move");

let slideState = 0;

const toggleBtn = () => {
    // if(slideState === 3){
    //     sliderRightBtn.style.opacity = "0";
    //     setTimeout(() => {
    //         sliderRightBtn.style.visibility = "hidden";
    //     }, 300);
    // }
    sliderRightBtn.style.visibility = (slideState === 3) ? "hidden" : "visible"; 
    sliderLeftBtn.style.visibility = (slideState === 0) ? "hidden" : "visible"; 
}
const slide = () => {
    let amount = slideState * 370 * -1;
    root.style.setProperty('--slider-x', amount + "px");
}

sliderRightBtn.addEventListener("click", () => {
    if (slideState < 3){
        slideState++;
        slide();
        toggleBtn();
    }
});
sliderLeftBtn.addEventListener("click", () => {
    if(slideState > 0){
        slideState--;
        slide();
        toggleBtn();
    }
});

toggleBtn();