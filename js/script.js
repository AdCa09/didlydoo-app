import { saveThemeToLocalstorage, loadThemeFromLocalStorage, darkMode, lightMode } from "./darkmode.js";
import { addNewEvent } from "./modal.js";
import { createEvent, fetchData, deleteEvent } from './DataBackEnd.js';

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

document.addEventListener('DOMContentLoaded', async () => {
    function createDeleteButton(eventId) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.backgroundColor = "red";
        deleteButton.style.height = "20px";
        deleteButton.setAttribute('data-event-id', eventId);

        deleteButton.addEventListener('click', async (e) => {
            e.preventDefault();
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
        });

        return deleteButton;
    }

    try {
        const events = await fetchData();
        const eventsList = document.getElementById('eventsList');
        events.forEach(event => {
            const div = document.createElement('div');
            div.id = `event${event.id}`;
            div.textContent = `${event.name} ${event.dates.join(', ')}, ${event.author}, ${event.description}`;
            eventsList.appendChild(div);
            div.style.backgroundColor = 'white';
            div.style.borderRadius = '18px';
            div.style.paddingTop = '18px';
            div.style.width = '50%';
            div.style.margin = '0 auto';
            div.style.textAlign = 'center';

            const deleteButton = createDeleteButton(event.id);
            div.appendChild(deleteButton);
        });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des événements", error);
    }

    const submitButton = document.querySelector('.submit');
    const eventTitle = document.getElementById('newEventName');
    const eventDescription = document.getElementById('newEventDescri');
    const authorEvent = document.getElementById('newAuthorName');

    if (!submitButton || !eventTitle || !eventDescription || !authorEvent) {
        console.error("Un ou plusieurs éléments DOM requis ne sont pas trouvés.");
        return;
    }

    submitButton.addEventListener("click", async (e) => {
        e.preventDefault();

        if (!isInputListEmpty()) {
            let dates = [];
            document.querySelectorAll("#newEventDate").forEach(inputDate => {
                dates.push(inputDate.value);
            });

            let newEvent = {
                name: eventTitle.value,
                dates: dates,
                author: authorEvent.value,
                description: eventDescription.value,
            };

            try {
                const createdEvent = await createEvent(newEvent);

                const div = document.createElement('div');
                div.id = `event${createdEvent.id}`;
                div.textContent = `${createdEvent.name} ${createdEvent.dates.join(', ')}, ${createdEvent.author}, ${createdEvent.description}`;
                let sectionEvent = document.getElementById('eventsList');
                div.style.backgroundColor = 'white';
                div.style.borderRadius = '18px';
                div.style.paddingTop = '18px';
                div.style.width = '50%';
                div.style.margin = '0 auto';
                div.style.textAlign = 'center';

                const deleteButton = createDeleteButton(createdEvent.id);
                div.appendChild(deleteButton);
                sectionEvent.appendChild(div);

                alert("Événement créé avec succès!");
            } catch (error) {
                console.error("Une erreur s'est produite lors de la création de l'événement", error);
            }
        }
    });

    function isInputListEmpty() {
        let isEmpty = false;
        const allInputs = [eventTitle, eventDescription, authorEvent, ...document.querySelectorAll("#newEventDate")];
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
});
