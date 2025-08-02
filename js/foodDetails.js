import { foodDetailsComponent } from "../Components/foodDetailsComponent.js";
import { getData } from "/js/fetchApi.js";
import { notFoundComponent } from "../Components/notFound.js";

//fetch data
const renderArea = document.getElementById("food-details");
const foods = await getData("food-items");

// get food
const params = new URLSearchParams(window.location.search);
const foodName = params.get("foodName");

// find food
const food = foods.find(f => String(f.name) === String(foodName));

// display food detail
if(food) {
  renderArea.innerHTML = foodDetailsComponent(food);
}
else {
  renderArea.innerHTML = notFoundComponent();
}