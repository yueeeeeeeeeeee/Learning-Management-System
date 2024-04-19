const openNav = document.getElementById("hamburger__container");
const menu = document.getElementById("nav__container");
let isMenuOpen = false; // Variable to track whether the menu is open

openNav.addEventListener("click", () => {
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "flex";
    isMenuOpen = true; // Menu is now open
  } else {
    menu.style.display = "none";
    isMenuOpen = false; // Menu is now closed
  }
});

window.addEventListener("click", (e) => {
  if (window.innerWidth < 745 && !openNav.contains(e.target)) {
    menu.style.display = "none";
    isMenuOpen = false; // Menu is now closed
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 745) {
    menu.style.display = "flex";
  } else if (!isMenuOpen) {
    // Only hide the menu if it's not open
    menu.style.display = "none";
  }
});
