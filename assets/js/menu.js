const burger = document.getElementById("burger");
const menuPrincipal = document.getElementById("menuPrincipal");


//console.dir(menuPrincipal.classList);
//console.dir(burger.classList);

burger.onclick = function() {
    //console.log("click confirmé");
    menuPrincipal.classList.toggle("transLeft");
    //console.dir(burger.classList);
    burger.classList.toggle("burgerUnselect");
    burger.classList.toggle("burgerSelect");
};