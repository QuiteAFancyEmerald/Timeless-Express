(function() {
    const i = document.getElementById("background");
    const nav = document.querySelector('.navbar');
    const input = document.querySelector('.nav-mobile');

    input.addEventListener("click", () => {
        nav.classList.toggle('nav-enabled');
    });
})();
