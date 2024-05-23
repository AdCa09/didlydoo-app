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

//MODAL MANAGER FOR NEW EVENT

// Get the modal
const modal = document.getElementById("formModal");
// Get the button that opens the modal
const addEvent = document.getElementById("addEvent");
// Get the  element that closes the modal
const closing = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal 
addEvent.onclick = function () {
    modal.style.display = "block";
}
// When the user clicks on  (x), close the modal
closing.onclick = function () {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


import { createEvent } from './DataBackEnd.js'; // Importez la bonne fonction pour créer un événement
const allInputs = document.querySelectorAll('input')
const submitButton = document.getElementById('addDate');
const eventTitle = document.getElementById('newEventName');
const eventDescription = document.getElementById('newEventDescri');

const authorEvent = document.getElementById('newAuthorName')

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (!isInputListEmpty()) {
        let dates = [];
        for (let inputDate of document.querySelectorAll(".input-date")) {
            dates.push(inputDate.value);
        }
        let newEvent = {
            name: eventTitle.value,
            dates: dates,
            author: authorEvent.value,
            description: eventDescription.value,
        };

        //send new event to backend (imported function)
        createEvent(newEvent);
    }
});
function isInputListEmpty() {
    let isEmpty = false;
    allInputs.forEach(input => {
        if (input.value.length < 3) {
            input.style.borderColor = "red";
            input.setAttribute("placeholder", "Please enter a value");
            isEmpty = true;
        } else if (input.value.length > 256) {
            input.style.borderColor = "red";
            input.setAttribute("placeholder", "Please enter a value less than 256");
            isEmpty = true;
        } else {
            input.style.borderColor = "white";

        }
    });
    return isEmpty;
}




//Create Div
function createDiv(type,parent,content,className) {
    const newDiv=document.createElement(type);
    if (content!=null) {
      newDiv.innerHTML=content;
    }
    if (className!=null) {
      newDiv.classList.add(className);
    }
    parent.appendChild(newDiv);
    return newDiv;
}

//Manage form

const formContent = document.getElementById("formContent");
let newEventName = document.getElementById('newEventName');
let newEventDescri = document.getElementById('newEventDescri')
let newEventDate = document.getElementById('newEventDate');
let clickCount = 0;

//Add another date
const addNewDate = () => {
    clickCount++;
    let divName = newEventDate.id + clickCount;
    console.log(divName);
    createDiv("input", formContent, '', divName);
    let addedDate = document.getElementById(divName);
    addedDate.setAttribute("type", "date");
};

document.getElementById("addDate").addEventListener("click", addNewDate);

