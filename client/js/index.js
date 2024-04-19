// CHANGING SIGNUP LINK TO LOGIN LINK
window.addEventListener("DOMContentLoaded", (event) => {
  const signupLink = document.getElementById("signupLink");

  // Check if the current page is login.html
  if (window.location.pathname.endsWith("login.html")) {
    signupLink.textContent = "Signup";
    signupLink.href = "signup.html";
  } else if (window.location.pathname.endsWith("signup.html")) {
    signupLink.textContent = "Login";
    signupLink.href = "login.html";
  } else { // For index.html and any other pages
    signupLink.textContent = "Login";
    signupLink.href = "login.html";
  }
});
var firstIndex = 0;

const automaticSlide = () => {
  setTimeout(
    automaticSlide, 5000);
  var pics;
  const img = document.querySelectorAll("img");
  for (pics = 0; pics < img.length; pics++) {
    img[pics].style.display = "none";
  }

  firstIndex++;
  if (firstIndex > img.length) {
    firstIndex = 1;
  }

  img[firstIndex - 1].style.display = "block";
};

automaticSlide();

