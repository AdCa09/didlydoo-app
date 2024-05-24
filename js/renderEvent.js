import { deleteEvent } from "./DataBackEnd";

export function renderEvent(event) {
    const eventList = document.getElementById("eventList");

    const eventContainer = document.createElement("div"); //create ev ent container
    eventContainer.classList.add("event-container");
    eventContainer.id = `Event ${event.id}`;

    const eventTitle = document.createElement("table");//create eventt title
    eventTitle.textContent = event.name;
    eventContainer.appendChild(eventTitle);

    const table = document.createElement("table"); //create table
    const headerRow = document.createElement("tr");
    const headerColumns = ['', ...event.dates].map(text => {
        const th = document.createElement("th");
        th.textContent = text;
        return th;
    });
    headerColumns.forEach(th => {
        headerRow.appendChild(th);
        table.appendChild(headerRow);
    });

    const authorRow = document.createElement("tr");
    const authorName = document.createElement("td");
    authorName.textContent = event.author;
    authorRow.appendChild(authorName);
    event.dates.forEach(() => {
        const cell = document.createElement("td");
        cell.innerHTML = ""; //à réflechir
        authorRow.appendChild(cell);
    });
    table.appendChild(authorRow);
    eventContainer.appendChild(table);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<img src ="assets/images/delete.svg"';

    deleteButton.addEventListener("click", () => {
        eventList.removeChild(eventContainer);
        deleteEvent(event.id);
    });

    eventContainer.appendChild(deleteButton);
    eventList.appendChild(eventContainer);

}