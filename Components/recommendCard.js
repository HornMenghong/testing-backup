"use strict"

export const foodRecommendComponent = (food) => {
  return `
    <div class="grid grid-cols-1 md:grid-cols-2 justify-center items-center rounded-2xl hover:shadow-sm hover:-translate-y-1 hover:scale-[1.01] transition duration-300">
      <div class="h-50">
        <a href="/html/foodDetails.html?foodName=${food.name}"><img class="w-full h-50 object-cover max-md:rounded-t-2xl md:rounded-l-2xl cursor-pointer" src="${food.image_url}" alt="food"></a>
      </div>
      <div class="p-5">
        <h2 class="my-2">${food.name}</h2>
        <p class="line-clamp-1">${food.description}</p>
        <div class="flex flex-wrap gap-2 my-4">
          ${food.meal_types.map(type => `
            <span class="bg-[#ff8506]/10 text-[#ff8506] dark:bg-[#ff8506]/20 text-sm font-medium px-2.5 py-1 rounded-full">
              <i class="fa-solid fa-clipboard-list"></i> ${type}
            </span>
          `).join("")}
          <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-sm font-medium px-2.5 py-1 rounded-full">
            <i class="fa-solid fa-clock"></i> ${food.preparation_time_minutes} min
          </span>
        </div>
      </div>
    </div>
  `
}