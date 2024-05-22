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
const eventTitle = document.getElementById('eventName');
const eventDescription = document.getElementById('eventDescri');

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


