"use strict"

export const foodCardComponent = (food) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const isFavorite = favorites.some(fav => fav.name === food.name);
  
  return `<div class="w-[1fr] rounded-2xl hover:shadow-sm hover:-translate-y-1 hover:scale-[1.01] transition duration-300">
            <a href="/html/foodDetails.html?foodName=${food.name}"><img class="aspect-square object-cover rounded-t-2xl cursor-pointer w-full" src="${food.image_url}"></a>
            <div class="p-5">
              <div class="flex justify-between mb-2">
                <h3 class="text-xl font-semibold line-clamp-1">${food.name}</h3>
                <i class="fa-regular fa-heart cursor-pointer mt-1.5 ${isFavorite ? 'fa-solid text-red-500' : 'fa-regular'}" data-food='${JSON.stringify(food)}'></i>
              </div>
              ${food.meal_types.map(type => `
                <span class="bg-primary/10 text-primary dark:bg-primary/20 text-sm font-medium px-2.5 py-1 rounded-full inline-block mr-2 mb-2">
                  <i class="fa-solid fa-clipboard-list mb-2 !hidden md:!inline"></i> ${type}
                </span>
              `).join("")}
              <p class="my-3 line-clamp-2">${food.description}</p>

              <!-- 🆕 User Info -->
              <div class="flex items-center gap-2">
                <img src="${food.user_profile_url || '/image/default-profile.png'}" class="w-8 h-8 rounded-full"/>
                <span class="text-sm text-gray-600">${food.user_name || 'Anonymous'}</span>
              </div>
            </div>
          </div>
  `
}