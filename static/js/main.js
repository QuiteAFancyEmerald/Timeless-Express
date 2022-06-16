(function() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/sw.js')
            .then(function() { console.log("Service Worker Registered"); });
    }

    const nav = document.querySelector('.navbar');
    const input = document.querySelector('.nav-mobile');

    input.addEventListener("click", () => {
        nav.classList.toggle('nav-enabled');
    });
})();