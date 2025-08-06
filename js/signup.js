document.getElementById("signup-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("c-password").value;

  const response = await fetch("https://nhamey-api.cheatdev.online/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      confirm_password: confirmPassword,
    }),
  });

  if (response.ok) {
    alert("Registration successful!");
    window.location.href = "/html/login.html";
  } else {
    const error = await response.json();
    alert("Registration failed: " + (error.detail?.[0]?.msg || "Unknown error"));
  }
});