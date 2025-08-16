document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector("a[href='/html/login.html']");
  const navLinks = document.getElementById("nav-links");
  const mobileMenu = document.getElementById("mobile-menu");
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("access_token");

  if (token && user) {
    // Remove Login button
    if (loginButton) {
      loginButton.remove();
    }

    // Optional: Add profile picture to nav bar
    const profilePicUrl = user.profile_picture?.trim()
      ? user.profile_picture
      : "/image/default-profile.png"; // fallback image
    const profileImage = document.createElement("img");
    profileImage.src = profilePicUrl;
    profileImage.alt = "Profile";
    profileImage.className = "h-10 w-10 rounded-full object-cover";

    const profileLink = document.createElement("a");
    profileLink.href = "/html/profile.html"; // or anywhere you want
    profileLink.appendChild(profileImage);

    const parent = document.querySelector("nav .flex.items-center.gap-3");
    if (parent) {
      parent.insertBefore(profileLink, parent.lastElementChild); // before theme toggle
    }
  } else {
    // Hide post recipe button if not logged in
    const postBtn = document.getElementById("post-recipe-btn");
    if (postBtn) {
      postBtn.style.display = "none";
    }
  }
});