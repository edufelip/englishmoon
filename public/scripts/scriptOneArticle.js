const apart = document.querySelector(".oneApart");

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
    if (window.pageYOffset > 70){
        apart.style.opacity = "1";
    } else {
        apart.style.opacity = "0";
    }
}, 200);

window.addEventListener("scroll", maxLimit)