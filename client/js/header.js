const openContainer = document.getElementById("hamburger__container");
const navMenu = document.getElementById("nav__container");

// This event listener is for opening the menu when the icon is clicked
openContainer.addEventListener("click", function (event) {
  event.stopPropagation(); // Prevents the event from bubbling up to the document
  if (navMenu.style.display === "none" || navMenu.style.display === "") {
    navMenu.style.display = "flex";
  } else {
    navMenu.style.display = "none";
  }
});

// This event listener is for closing the menu when anywhere else is clicked
document.addEventListener("click", function () {
  if (window.innerWidth < 745) {
    navMenu.style.display = "none";
  }
});

// This event listener is for preventing the menu from closing when it is clicked
navMenu.addEventListener("click", function (event) {
  event.stopPropagation(); // Prevents the event from bubbling up to the document
});

// This event listener is for showing the menu when the viewport is 745px or more
window.addEventListener("resize", function () {
  if (window.innerWidth >= 745) {
    navMenu.style.display = "flex";
  } else {
    navMenu.style.display = "none";
  }
});
