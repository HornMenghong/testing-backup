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

  // 1️⃣ Create recipe data
  const recipeFormData = new FormData();
  recipeFormData.append("name", document.getElementById("name").value);
  recipeFormData.append("description", document.getElementById("description").value);
  recipeFormData.append("cuisine", document.getElementById("cuisine").value);
  recipeFormData.append("category", "food");
  recipeFormData.append("meal_types", document.getElementById("meal_type").value);
  recipeFormData.append("ingredients", document.getElementById("ingredients").value);
  recipeFormData.append("cooking_instructions", document.getElementById("instructions").value);
  recipeFormData.append("preparation_time_minutes", document.getElementById("prep_time").value);

  // attach user info
  recipeFormData.append("user_id", user.id);
  recipeFormData.append("user_name", user.username);
  recipeFormData.append("user_profile_url", user.profile_picture || "/image/default-profile.png");

  try {
    // 2️⃣ Submit recipe
    const recipeResponse = await fetch("/api/proxy/food-items", {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
      body: recipeFormData
    });

    if (!recipeResponse.ok) {
      const error = await recipeResponse.json();
      throw new Error(error.detail?.[0]?.msg || "Failed to create recipe");
    }

    const recipeData = await recipeResponse.json();
    const foodId = recipeData.id; // assuming API returns the new recipe ID

    // 3️⃣ Upload image if exists
    if (file) {
      const imageFormData = new FormData();
      imageFormData.append("file", file);
      imageFormData.append("category", "food");
      imageFormData.append("related_id", foodId);
      imageFormData.append("description", document.getElementById("description").value);

      const imageResponse = await fetch(`/api/proxy/upload/food-image?food_id=${foodId}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: imageFormData
      });

      if (!imageResponse.ok) {
        const error = await imageResponse.json();
        console.warn("Image upload failed:", error);
      }
    }

    alert("Recipe posted successfully!");
    window.location.href = "/html/community.html";

  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
});
