"use strict"

import { getData } from "./fetchApi.js";
import { foodCardComponent } from "../Components/foodCard.js";
import { foodRecommendComponent } from "../Components/recommendCard.js";
import { heroComponent } from "../Components/hero.js";

const foodData = document.getElementById("popular-cards");
const food = await getData("food-items");


// Hero Section
const heroCard = document.getElementById("hero");
let currentIndex = 0;

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


// Popular Section
let currentFoodIndex = 0;
const batchSize = 4;

function renderFoodBatch() {
  const nextBach = food.slice(currentFoodIndex, currentFoodIndex + batchSize);
  nextBach.forEach(item => {
    foodData.innerHTML += foodCardComponent(item);
  });

  currentFoodIndex += batchSize;
}

renderFoodBatch();

// Recommend section

// Rotate Recommend
const rotateRecommend = document.getElementById("rotate-recommend")
function renderRotate(index) {
  rotateRecommend.innerHTML = foodCardComponent(food[index]);
}

function startRecommendRotation() {
  renderRotate(currentIndex);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % food.length; // loop back
    renderRotate(currentIndex);
  }, 5000);
}

if (food && food.length > 0) {
  startRecommendRotation();
}

// Normal Recommend
const recommendData = document.getElementById("recommend-cards");
function renderRecommendBatch() {
  const nextBach = food.slice(currentFoodIndex, currentFoodIndex + batchSize);
  nextBach.forEach(item => {
    recommendData.innerHTML += foodRecommendComponent(item);
  });

  currentFoodIndex += batchSize;
}

renderRecommendBatch();

// General Section
let currentGeneralIndex = 0;
const generalData = document.getElementById("general-cards");
const generalSize = 8;
function renderGeneralBatch() {
  const nextBach = food.slice(currentGeneralIndex, currentGeneralIndex + generalSize);
  nextBach.forEach(item => {
    generalData.innerHTML += foodCardComponent(item);
  });

  currentGeneralIndex += generalSize;
}

renderGeneralBatch();

import { getFavorites, saveFavorites } from "./storage.js";

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