const backToTop = document.querySelector(".backToTop");

function toggleBackToTopButton() {
    if (window.scrollY >= 250) {
        backToTop.classList.add("active");
    } else {
        backToTop.classList.remove("active");
    }
}


window.addEventListener("scroll", toggleBackToTopButton);


backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
