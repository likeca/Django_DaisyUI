(function () {
    let top = window.scrollY;
    // console.log(top);
    if (top < 40) {
        // document.getElementById("navbar").classList.remove("shadow-lg");
        // document.getElementById("navbar").classList.add("shadow-sm");
    }

    window.onscroll = function () {
        top = window.scrollY;
        if (top < 40) {
            // document.getElementById("navbar").classList.remove("shadow-lg");
            // document.getElementById("navbar").classList.add("shadow-sm");
        } else {
            // document.getElementById("navbar").classList.remove("shadow-sm");
            // document.getElementById("navbar").classList.add("shadow-lg");
        }
    };
})();
)