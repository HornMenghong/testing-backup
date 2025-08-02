"use strict"

export const foodCardComponent = (food) => {
  return `<div class="w-[1fr] rounded-2xl shadow-sm  hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] transition duration-300">
            <a href="/html/foodDetails.html?foodName=${food.name}"><img class="aspect-square object-cover rounded-t-2xl cursor-pointer w-full" src="${food.image_url}"></a>
            <div class="p-5">
              <div class="flex justify-between items-center">
                <h3 class="text-xl font-semibold">${food.name}</h3>
                <i class="fa-regular fa-heart cursor-pointer"></i>
              </div>
              <p class="my-5">${food.description}</p>
            </div>
          </div>
  `
}