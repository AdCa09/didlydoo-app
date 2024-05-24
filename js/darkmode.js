export function saveThemeToLocalstorage(theme) {
  localStorage.setItem("theme", JSON.stringify(theme));
}

export function loadThemeFromLocalStorage() {
  const savedTheme = JSON.parse(localStorage.getItem("theme"));
  if (savedTheme === "dark") {
    darkMode();
  } else {
    lightMode();
  }
}

export function lightMode() {
  const mode = document.querySelector(".mode-button");
  const body = document.querySelector("body");    
  const svgs = Array.from(document.querySelectorAll(".svg"));
  const elements = body.querySelectorAll("*");
  
  document.documentElement.setAttribute("data-theme", "light");
  body.classList.add("light");
  body.classList.remove("dark");
  
  svgs.forEach((svg) => {
    svg.classList.add("svgLightMode");
    svg.classList.remove("svgDarkMode");//remove class to change color to light mode
  });

  elements.forEach(element => {
    element.classList.add("light");
    element.classList.remove("dark");
  }); 

  mode.src = "assets/images/mode-dark.svg";
}

export function darkMode() {
  const mode = document.querySelector(".mode-button");
  const body = document.querySelector("body");    
  const svgs = Array.from(document.querySelectorAll(".svg"));
  const elements = body.querySelectorAll("*");

  document.documentElement.setAttribute("data-theme", "dark");
  body.classList.add("dark");
  body.classList.remove("light");

  svgs.forEach((svg) => {
    svg.classList.add("svgDarkMode");
    svg.classList.remove("svgLightMode");
  });

  elements.forEach(element => {
    element.classList.add("dark");
    element.classList.remove("light");
  }); 

  mode.src = "assets/images/mode-light.svg";
}

