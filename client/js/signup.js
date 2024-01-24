// GETTING SIGNUP BUTTON
const signupButton = document.getElementById("submit-button");
// GETTING THE FORM
const signupForm = document.getElementById("signup-form");

// CREATE A FUNCTION THAT CAN VALIDATE THE EMAIL
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// CREATE A FUNCTION THAT CAN VALIDATE THE FORM
const validateSignupForm = (event) => {
  // RESET THE ERROR MESSAGE
  document.getElementById("name-error").style.display = "none";
  document.getElementById("email-error").style.display = "none";
  document.getElementById("password-error").style.display = "none";
  document.getElementById("confirm-password-error").style.display = "none";

  // GETTING THE VALUES FROM THE FORM
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // CHECKING IF THE NAME IS EMPTY
  if (name === "") {
    document.getElementById("name-error").style.display = "block";
    return false;
  }

  // CHECKING IF THE EMAIL IS EMPTY
  if (email === "") {
    document.getElementById("email-error").style.display = "block";
    return false;
  } else if (!validateEmail(email)) {
    document.getElementById("email-error").style.display = "block";
    document.getElementById("email-error").textContent =
      "Invalid Email Address";
    return false;
  }

  // CHECKING IF THE PASSWORD IS EMPTY
  if (password === "") {
    document.getElementById("password-error").style.display = "block";
    return false;
  } else if (password.length < 8) {
    document.getElementById("password-error").style.display = "block";
    document.getElementById("password-error").textContent =
      "Password must be at least 8 characters";
    return false;
  } else if (!/[A-Z]/.test(password)) {
    document.getElementById("password-error").style.display = "block";
    document.getElementById("password-error").textContent =
      "Password must contain at least one uppercase letter";
    return false;
  }

  // CHECKING IF THE CONFIRM PASSWORD IS EMPTY
  if (confirmPassword === "") {
    document.getElementById("confirm-password-error").style.display = "block";
    return false;
  } else if (confirmPassword !== password) {
    document.getElementById("confirm-password-error").style.display = "block";
    document.getElementById("confirm-password-error").textContent =
      "Password does not match";
    return false;
  }

  return true;
};

// SUBMIT FORM FUNCTION
const submitForm = async (event) => {
  event.preventDefault();

  // VALIDATE THE FORM
  if (!validateSignupForm(event)) {
    event.preventDefault();
    return;
  }

  // GETTING THE VALUES FROM THE FORM
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // MAKE A REQUEST TO THE SERVER (LOCALHOST)
  const response = await fetch("http://localhost:5001/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  // GETTING THE RESPONSE FROM THE SERVER
  if (response.ok) {
    const data = await response.json();
    console.log(data.message);
  } else {
    const error = await response.json();
    console.error(error.message);

    if (response.status === 400) {
      // HANDLE THE DUPLICATE ENTRY ERROR
      console.log(error.message);
    }
  }
};

// ADD EVENT LISTENER TO THE BUTTON
signupButton.addEventListener("click", (event) => {
  submitForm(event);
});

// WE GOT THREE FUNCTIONS
// 1. validateEmail
// 2. validateSignupForm
// 3. submitForm