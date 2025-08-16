document.getElementById("recipe-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    alert("You must be logged in to post a recipe!");
    return;
  }

  const fileInput = document.getElementById("image_file");
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("name", document.getElementById("name").value.trim());
  formData.append("description", document.getElementById("description").value.trim());
  formData.append("cuisine", document.getElementById("cuisine").value.trim());
  formData.append("category", "food");
  formData.append("meal_types", document.getElementById("meal_type").value.trim());
  formData.append("ingredients", document.getElementById("ingredients").value.trim());
  formData.append("cooking_instructions", document.getElementById("instructions").value.trim());
  formData.append("preparation_time_minutes", document.getElementById("prep_time").value.trim());

  // attach user
  formData.append("user_id", user.id);
  formData.append("user_name", user.username);
  formData.append("user_profile_url", user.profile_picture || "/image/default-profile.png");

  if (file) {
    formData.append("image", file);
  }

  // log to debug
  for (let pair of formData.entries()) {
    console.log(pair[0]+ ': '+ pair[1]);
  }

  try {
    const response = await fetch("/api/proxy/food-items", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });

    if (response.ok) {
      alert("Recipe posted successfully!");
      window.location.href = "/html/community.html";
    } else {
      const text = await response.text(); // fallback if not JSON
      console.error("Server error:", text);
      alert("Failed to post recipe. Check console for details.");
    }

  } catch (err) {
    console.error("Fetch error:", err);
    alert("An error occurred. Check console for details.");
  }
});
