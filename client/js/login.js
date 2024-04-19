window.addEventListener("DOMContentLoaded", (event) => {
  const signupLink = document.getElementById("signupLink");

  // Check if the current page is login.html
  if (window.location.pathname.endsWith("login.html")) {
    signupLink.textContent = "Sign Up";
    signupLink.href = "signup.html";
  } else if (window.location.pathname.endsWith("signup.html")) {
    signupLink.textContent = "Login";
    signupLink.href = "login.html";
  }
});