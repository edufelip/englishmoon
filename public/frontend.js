var lis = document.querySelectorAll(".li-color");

for (var i = 0; i < lis.length; i++) {
    lis[i].addEventListener("mouseover", function (){
        this.style.background = "pink";
    });
}
for (var i = 0; i < lis.length; i++) {
    lis[i].addEventListener("mouseout", function (){
        this.style.background = "white";
    });
}

