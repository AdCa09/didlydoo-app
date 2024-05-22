// let darkModeChoice = localStorage.getItem("darkmode");
// if (darkmodeChoice == null) {
//     localStorage.setItem("darkmode", false)
//     lightMode()
// } else if (darkModeChoice == 'true') {
//     darkModeChoice()
// } else {
//     lightMode()
// }

// const modeButton = document.querySelector(".mode");
// modeButton.addEventListener("click", () => {
//     darkModeChoice = localStorage.getItem("darkmode");
//     if (darkModeChoice == "true") {
// lightMode()
//     } else {
//         darkMode()
//     }
// });

// export function lightMode() {
//     const mode = document.querySelector(".mode");
//     const svgs = Array.from(document.querySelectorAll(".svg"));
//     localStorage.setItem("darkmode", false);
//     document.documentElement.setAttribute("data-theme", "light");
//     svgs.forEach((svg) => {
//         svg.classList.add("svgLightMode");
//         svg.classList.remove("svgDarkMode");//remove class to change color to light mode
//     });
//     mode.src = "./assets/images/mode-dark.svg";
// }

// export function darkMode() {
//     const logo = document.getElementsByClassName("logo")[0];
//     const mode = document.querySelector(".mode");
//     const svgs = Array.from(document.querySelectorAll(".svg"));
//     localStorage.setItem('darkmode', true)
//     document.documentElement.setAttribute("data-theme", "dark");
//     svgs.forEach((svg) => {
//       svg.classList.add("svgDarkMode");
//       svg.classList.remove("svgLightMode");
//     });
//     mode.src = "./assets/images/icons/mode-light.svg";
//   }

export function saveThemeToLocalstorage(theme) {
  
  localStorage.setItem("theme", JSON.stringify(theme));
}

export function loadThemeFromLocalStorage() {
  const savedTheme = JSON.parse(localStorage.getItem("theme"));
  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
  }
}

export function lightMode() {
  const mode = document.querySelector(".mode-button");
  const body =document.querySelector("body");
  const svgs = Array.from(document.querySelectorAll(".svg"));
  // localStorage.setItem("darkmode", false);
  document.documentElement.setAttribute("data-theme", "light");
  body.classList.add("light");
  body.classList.remove("dark");
  svgs.forEach((svg) => {
    svg.classList.add("svgLightMode");
    svg.classList.remove("svgDarkMode");//remove class to change color to light mode
  });
  mode.src = "assets/images/mode-dark.svg";
}

export function darkMode() {
  const mode = document.querySelector(".mode-button");
  const body =document.querySelector("body");
  const svgs = Array.from(document.querySelectorAll(".svg"));
  document.documentElement.setAttribute("data-theme", "dark");
  body.classList.add("dark");
  body.classList.remove("light");
  svgs.forEach((svg) => {
    svg.classList.add("svgDarkMode");
    svg.classList.remove("svgLightMode");
  });
  mode.src = "assets/images/mode-light.svg";
}