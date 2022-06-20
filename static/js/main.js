(function() {
    const i = document.getElementById("background");
    const nav = document.querySelector('.navbar');
    const input = document.querySelector('.nav-mobile');

    input.addEventListener("click", () => {
        nav.classList.toggle('nav-enabled');
    });

    //Background animation disabled on Firefox for now!
    if (navigator.userAgent.indexOf("Gecko/") > 0) {
        /* Huge Thank You to YÖCTDÖNALD'S for fixing the various Firefox issues! */
        i.src = "/svg/background-firefox.svg";
    }
})();