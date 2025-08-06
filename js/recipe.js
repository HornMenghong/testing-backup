"use strict"

import { getData } from "./fetchApi.js";
import { foodCardComponent } from "../Components/foodCard.js";

try {
  // Fetch food list
  const foodList = await getData("food-items");

  // DOM references
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");
  const resultsEl = document.getElementById("search-results");

  // Main render function
  function renderFoodList() {
    const keyword = searchInput.value.trim().toLowerCase();
    const sortBy = sortSelect.value;

    // 1. Filter by name
    let filtered = foodList.filter((food) =>
      food.name.toLowerCase().includes(keyword)
    );

    // 2. Sort
    filtered = sortFoodItems(filtered, sortBy);

    // 3. Render
    resultsEl.innerHTML = filtered.length
      ? filtered.map(foodCardComponent).join("")
      : `<p class="text-center text-gray-500 col-span-full">No results found.</p>`;
  }

  // Sorting logic
  function sortFoodItems(items, sortBy) {
    switch (sortBy) {
      case "rating":
        return [...items].sort((a, b) => b.rating - a.rating);
      case "trending":
        return [...items].sort((a, b) => b.views - a.views); // or another "trending" metric
      case "price_low":
        return [...items].sort((a, b) => a.price - b.price);
      case "price_high":
        return [...items].sort((a, b) => b.price - a.price);
      case "newest":
        return [...items].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      case "relevance":
      default:
        return items; // leave as-is
    }
  }

  // Event listeners
  searchInput.addEventListener("input", renderFoodList);
  sortSelect.addEventListener("change", renderFoodList);

  // Initial render
  renderFoodList();
}
catch(error) {
  console.error("Error:", error.message);
}