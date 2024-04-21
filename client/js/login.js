document.addEventListener('DOMContentLoaded', (event) => {
  const loginButton = document.getElementById("login-button");

  const submitForm = async (event) => {
    event.preventDefault();

    // GETTING THE VALUES
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);

      alert("Login Successful! Welcome");
      window.location.href = "lms_home.html";
    } else {
      const error = await response.json();
      console.error(error.message);

      alert("Invalid email or password");
      window.location.href = "login.html";
    }
  };

  loginButton.addEventListener("click", submitForm);
});