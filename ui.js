//page loader
$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
});

//Mobile navbar
const navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".menu-area");
    const navLinks = document.querySelectorAll(".menu-area li");

    burger.addEventListener("click", () => {
        //Toggle Nav
        nav.classList.toggle("nav-active");

        //Animate links
        navLinks.forEach((link, index) =>{
            if (link.style.animation){
                link.style.animation = "";
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        //Animate burger
        burger.classList.toggle("tapped");
    });
}

navSlide();