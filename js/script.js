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
        deleteButton.innerHTML = '<img src="assets/images/delete.svg" alt="Delete" class="svg">';

        deleteButton.style.backgroundColor = "transparent";
        deleteButton.style.border = "none";
        deleteButton.style.cursor = "pointer";
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



    function createEventCard(event) {
        const card = document.createElement('div');
        card.id = `event${event.id}`;
        card.style.backgroundColor = 'var(--colorEventBackground)';
        card.style.color = 'var(--colorText)';
        card.style.borderRadius = '10px';
        card.style.padding = '20px';
        card.style.width = '300px';
        card.style.boxShadow = 'var(--colorEventShadow)';
        card.style.position = 'relative';

        const title = document.createElement('h3');
        title.textContent = event.name;
        title.style.margin = '0 0 10px 0';

        const deleteButton = createDeleteButton(event.id);
        deleteButton.style.position = 'absolute';
        deleteButton.style.top = '10px';
        deleteButton.style.right = '10px';

        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        // Ajout de la cellule "Dates" dans le header du tableau
        const emptyHeader = document.createElement('th');
        emptyHeader.textContent = '';
        emptyHeader.style.border = '1px solid var(--colorText)';
        emptyHeader.style.padding = '8px';
        emptyHeader.style.backgroundColor = 'var(--colorEventBackground)';
        emptyHeader.style.textAlign = 'left';
        emptyHeader.style.backgroundColor = 'var(--colorEventBackground)';
        headerRow.appendChild(emptyHeader);

        // Ajout des en-têtes de date dans le header du tableau
        event.dates.forEach(dateObj => {
            const formattedDate = formatDate(dateObj.date); // Formatage de la date
            const th = document.createElement('th');
            th.textContent = formattedDate;
            th.style.border = '1px solid var(--colorText)';
            th.style.padding = '8px';
            th.style.backgroundColor = 'var(--colorEventBackground)';
            th.style.textAlign = 'left';
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Corps du tableau
        // Corps du tableau
        const tbody = document.createElement('tbody');
        const authors = event.author.split(', ');
        authors.forEach(author => {
            const row = document.createElement('tr');

            // Création de la cellule pour le nom de l'auteur
            const authorCell = document.createElement('td');
            authorCell.textContent = author;
            authorCell.style.border = '1px solid var(--colorText)';
            authorCell.style.padding = '8px';
            row.appendChild(authorCell);

            // Ajout de cellules <td> vides pour correspondre à chaque date
            for (let i = 0; i < event.dates.length; i++) {
                const emptyCell = document.createElement('td');
                emptyCell.textContent = ''; // Cellule vide
                emptyCell.style.border = '1px solid var(--colorText)';
                emptyCell.style.padding = '8px';
                row.appendChild(emptyCell);
            }

            tbody.appendChild(row);
        });

        table.appendChild(tbody);

        table.appendChild(tbody);
        card.appendChild(title);
        card.appendChild(deleteButton);
        card.appendChild(table);

        return card;
    }

    try {
        const events = await fetchData();
        const eventsList = document.getElementById('eventsList');

        events.forEach(event => {
            const eventCard = createEventCard(event);
            eventsList.appendChild(eventCard);
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
                const eventCard = createEventCard(createdEvent);
                document.getElementById('eventsList').appendChild(eventCard);
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

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('fr-FR', options);
    }
});

// Autres parties de votre code...

