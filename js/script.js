"use strict"

import { getData } from "./fetchApi.js";
import { foodCardComponent } from "../Components/foodCard.js";

const foodData = document.getElementById("popular-cards");
const food = await getData("food-items");

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