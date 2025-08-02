"use strict"

import { getData } from "./fetchApi.js";
import { foodCardComponent } from "../Components/foodCard.js";

const food = await getData("food-items");
const mealData = document.getElementById("recipe-cards");

let currentMealIndex = 0;
const batchRecipe = 20;

export function renderRecipeBatch() {
  const allRecipe = [...food.popular, ...food.desserts];
  const nextBach = allRecipe.slice(currentMealIndex, currentMealIndex + batchRecipe);
  nextBach.forEach(item => {
    mealData.innerHTML += foodCardComponent(item);
  });

  currentMealIndex += batchRecipe;
}

renderRecipeBatch();