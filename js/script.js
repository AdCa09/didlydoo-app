import { saveThemeToLocalstorage } from "./darkmode.js";
import { loadThemeFromLocalStorage } from "./darkmode.js";
import { lightMode } from "./darkmode.js";
import { darkMode } from "./darkmode.js";

const modeButton = document.querySelector(".mode");
const html = document.querySelector("html");

window.addEventListener('DOMContentLoaded', () => {
    loadThemeFromLocalStorage(html);
});

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
});

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



// crée un événement dans le back via le form

import { createEvent } from './DataBackEnd.js';
import { updateEvent } from './DataBackEnd.js';
import { deleteEvent } from "./DataBackEnd.js"
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

//function pour 256 caractères et moins de 3.
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


// modifie un événement dans le back 

const editButton = document.getElementById('');


editButton.addEventListener('click', (e) =>{
    e.preventDefault();
    let date = [];
    if (!isInputListEmpty()) {
        for (let inputDate of document.querySelectorAll(".input-date")) {
            dates.push(inputDate.value);
        }
        let patchEvent = {
            name: eventTitle.value,
            author: authorEvent.value,
            description: eventDescription.value,
        };

        //send patch event to backend (imported function)
        updateEvent(patchEvent);
    }
});


//supprime l'event dans le back 

const deleteButtons = document.querySelectorAll('');// a ajouter lors de la création des des events en js 

deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const eventId = deleteButton.getAttribute('data-event-id');

        if (eventId) {
            try {
                const response = await deleteEvent(eventId); 
                if (response.success) {
                    document.getElementById(`event${eventId}`).remove();
                } else {
                    console.error('Failed to delete event:', response.message);
                }
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        } else {
            console.error('Event ID not found');
        }
    });
});
