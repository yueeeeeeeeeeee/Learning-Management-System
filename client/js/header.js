const navContainer = document.getElementById("nav__container");
const openNav = document.getElementById("open__nav");

openNav.addEventListener("click", function () {
  navContainer.style.display = "flex";
});

document.addEventListener('click', function(event) {
  if (!navContainer.contains(event.target) && event.target !== openNav) {
    navContainer.style.display = 'none';
  }
});