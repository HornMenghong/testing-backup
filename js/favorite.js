import { foodCardComponent } from '../Components/foodCard.js';
import { getFavorites, saveFavorites } from "./storage.js";
import { getData } from './fetchApi.js';


document.addEventListener("DOMContentLoaded", async () => {
  try { 
    const food = await getData("food-items");
    // Hero Section
    const heroCard = document.getElementById("hero");
    let currentIndex = 0;

    const heroComponent = (food) => {
      return `<img class="w-full h-[300px] lg:h-[500px] object-cover brightness-50" src="${food.image_url}" alt="hero">
            <div class="absolute inset-0 bg-black opacity-10"></div>
            <div class="absolute top-10 left-10 md:top-20 md:left-20 w-[40%] lg:w-[30%] text-white">
              <h1 class="text-5xl">Your Favorite Food</h1>
              <p class="my-4 line-clamp-3">Hello, and welcome to your Favorites. This section features the dishes you have selected as your top picks. 
    Enjoy easy access to meals you know and love — anytime.</p>
            </div>`
    }

    function renderHero(index) {
      heroCard.innerHTML = heroComponent(food[index]);
    }

    function startHeroRotation() {
      renderHero(currentIndex);

      setInterval(() => {
        currentIndex = (currentIndex + 1) % food.length; // loop back
        renderHero(currentIndex);
      }, 5000);
    }

    if (food && food.length > 0) {
      startHeroRotation();
    }
    const favorites = getFavorites();
    const container = document.getElementById("favorite-container");

    if (!container) return;

    if (favorites.length === 0) {
      container.innerHTML = "<p class='text-gray-500 md:text-3xl text-center'>No favorites yet.</p>";
      return;
    }

    container.innerHTML = favorites.map(food => foodCardComponent(food)).join("");
    
    // Handle heart icon toggle
    document.addEventListener("click", function (e) {
      const heartIcon = e.target.closest(".fa-heart");
    
      if (heartIcon) {
        const food = JSON.parse(heartIcon.getAttribute("data-food"));
        let favorites = getFavorites();
        const index = favorites.findIndex(fav => fav.name === food.name);
    
        if (index !== -1) {
          favorites.splice(index, 1);
          heartIcon.classList.remove("fa-solid", "text-red-500");
          heartIcon.classList.add("fa-regular");
        } else {
          favorites.push(food);
          heartIcon.classList.remove("fa-regular");
          heartIcon.classList.add("fa-solid", "text-red-500");
        }
    
        saveFavorites(favorites);
      }
    });
  }
  catch(error) {
    console.error("Error:", error.message);
  }
});