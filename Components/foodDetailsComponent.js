"use strict"

export const foodDetailsComponent = (food) => {
  const instructions = food.cooking_instructions
    .map(step => `<li>${step}</li>`)
    .join("");

  const ingredients = food.ingredients
    .map(items => `<li>${items}</li>`)
    .join("");

  return `
  <section class="p-5 text-gray-700 dark:text-white">
    <a href="/index.html" class="hover:text-primary transition-colors"><i class="fa-solid fa-arrow-left mb-5"></i> Back to Home</a>
    <br>
    <img class="w-full object-cover aspect-video" src="${food.image_url}" alt="food">
    <h2>${food.name}</h2>
    <div class="flex flex-wrap gap-2 mb-4">
      <span class="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 text-sm font-medium px-2.5 py-1 rounded-full">
       <i class="fa-solid fa-fire"></i> ${food.calories} kcal
      </span>
      <span class="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-sm font-medium px-2.5 py-1 rounded-full">
        <i class="fa-solid fa-bowl-food"></i> ${food.carbs}g carbs
      </span>
      <span class="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300 text-sm font-medium px-2.5 py-1 rounded-full">
        <i class="fa-solid fa-fire-flame-simple"></i> ${food.fat}g fat
      </span>
      ${food.meal_types.map(type => `
        <span class="bg-[#ff8506]/10 text-[#ff8506] dark:bg-[#ff8506]/20 text-sm font-medium px-2.5 py-1 rounded-full">
          <i class="fa-solid fa-clipboard-list"></i> ${type}
        </span>
      `).join("")}
      <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-sm font-medium px-2.5 py-1 rounded-full">
        <i class="fa-solid fa-clock"></i> ${food.preparation_time_minutes} min
      </span>
    </div>
    <p>${food.description}</p>
    <h2>Ingredient</h2>
    <ul class="list-disc list-inside">
      ${ingredients}
    </ul>
    <h2>Cooking Instruction</h2>
    <ol class="list-decimal list-inside">
      ${instructions}
    </ol>
  </section>`
}