import { saveThemeToLocalstorage } from "./darkmode.js";
import { loadThemeFromLocalStorage } from "./darkmode.js";
import { lightMode } from "./darkmode.js";
import { darkMode } from "./darkmode.js";

window.addEventListener('DOMContentLoaded', loadThemeFromLocalStorage);

const modeButton = document.querySelector(".mode");
const html = document.querySelector("html");

modeButton.addEventListener("click", () => {
  const dataTheme = html.getAttribute("data-theme");
  if (dataTheme === "light") {
    html.setAttribute("data-theme", "dark");
    darkMode();
    saveThemeToLocalstorage("dark");
  } else {
    html.setAttribute("data-theme", "light");
    lightMode();
    saveThemeToLocalstorage("light");
  }
})