(function() {
    if (navigator.userAgent.indexOf("/") > 0) {
        document.getElementById("code").textContent = ('Your Browser: ' + navigator.userAgent);
    }
})();