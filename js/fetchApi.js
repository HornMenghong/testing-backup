"use strict"

const BASE_URL = "https://nhamey-api.cheatdev.online/";

export async function getData(endpoint) {
  try {
    const res = await fetch(BASE_URL + endpoint);
    const data = await res.json();
    return data;
  }
  catch(error) {
    console.error("Error:", error.message);
  }
}