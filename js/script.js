
import { saveThemeToLocalstorage, loadThemeFromLocalStorage, darkMode, lightMode } from "./darkmode.js";


import { addNewEvent } from "./modal.js";
// import { renderEvent } from "./renderEvent.js";
addNewEvent();



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


// crée un événement dans le back via le form
import { createEvent, fetchData } from './DataBackEnd.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Afficher les événements existants
    try {
        const events = await fetchData();
        const eventsList = document.getElementById('eventsList');
        events.forEach(event => {
            const div = document.createElement('div');
            div.textContent = `${event.name} ${event.dates.join(', ')}, ${event.author}, ${event.description}`;
            eventsList.appendChild(div);
            div.style.backgroundColor = 'white';
            div.style.borderRadius = '18px';
            div.style.paddingTop = '18px';
            div.style.width = '50%';
            div.style.margin = '0 auto';
            div.style.textAlign = 'center';

        });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des événements", error);
    }

    const submitButton = document.getElementById('submitEvent');
    const eventTitle = document.getElementById('newEventName');
    const eventDescription = document.getElementById('newEventDescri');
    const authorEvent = document.getElementById('newAuthorName');

    submitButton.addEventListener("click", async (e) => {
        e.preventDefault();
        if (!isInputListEmpty()) {
            let dates = [];
            for (let inputDate of document.querySelectorAll("#newEventDate")) {
                dates.push(inputDate.value);
            }
            let newEvent = {
                name: eventTitle.value,
                dates: dates,
                author: authorEvent.value,
                description: eventDescription.value,
            };

            // Envoyer le nouvel événement au backend
            try {
                await createEvent(newEvent);
                alert("Événement créé avec succès!");
                location.reload(); // Recharger la page pour afficher les nouveaux événements
            } catch (error) {
                console.error("Une erreur s'est produite lors de la création de l'événement", error);
            }
        }
    });

    function isInputListEmpty() {
        const allInputs = document.querySelectorAll('input');
        for (let input of allInputs) {
            if (input.value.trim() === '') {
                return true;
            }
        }
        return false;
    }
});


// function isInputListEmpty() {
//     const allInputs = document.querySelectorAll('input');
//     for (let input of allInputs) {
//         if (input.value.trim() === '') {
//             return true;
//         }
//     }
//     return false;
// }
//         });


//function pour 256 caractères et min 3.
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


editButton.addEventListener('click', (e) => {
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


