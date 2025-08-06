document.addEventListener("DOMContentLoaded", () => {
  const profilePicture = document.getElementById("profile-picture");
  const imageUpload = document.getElementById("image-upload");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const bioInput = document.getElementById("bio");
  const form = document.getElementById("profile-form");

  const user = JSON.parse(localStorage.getItem("user")) || {};

  // Load existing data
  profilePicture.src = user.profile_picture || "/image/default-profile.png";
  usernameInput.value = user.username || "";
  emailInput.value = user.email || "";
  bioInput.value = user.bio || "";

  // Handle profile picture change
  imageUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      profilePicture.src = reader.result;
      user.profile_picture = reader.result; // Save as base64 in localStorage
    };
    reader.readAsDataURL(file);
  });

  // Save changes
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    user.username = usernameInput.value.trim();
    user.email = emailInput.value.trim();
    user.bio = bioInput.value.trim();

    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated successfully!");
  });
  document.getElementById("logout-btn").addEventListener("click", () => {
  // Remove stored user info & token
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Optional: clear all localStorage if you want
  // localStorage.clear();

  // Redirect to login page (or home)
  window.location.href = "/index.html";
  });
});