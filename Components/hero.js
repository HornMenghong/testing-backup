"use strict"

export const heroComponent = (food) => {
  return `
  <img class="w-full h-[500px] lg:h-[700px] object-cover brightness-50" src="${food.image_url}" alt="hero">
    <div class="absolute inset-0 bg-black opacity-10"></div>
    <div class="absolute top-10 left-10 md:top-20 md:left-20 w-[40%] lg:w-[20%] text-white">
      <h1 class="text-5xl">${food.name}</h1>
      <p class="my-4 line-clamp-3">${food.description}</p>
      <a href="/html/foodDetails.html?foodName=${food.name}"><button class="button">Explore More</button></a>
    </div>`
}