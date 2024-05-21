//variables

const btn = document.getElementById('header_button');
const events = document.getElementById('events');
let btn_addName = document.createElement('button');

//Appelle de l'api
function fetchData(){
    fetch('http://localhost:3000/')
    .then((response) => response.json())
    .then((json) =>{
        console.log(json);
        displayEvents(json);
    })
}


// crées les éléments pour l'html
function displayEvents(){
     DataTransfer.forEach((event) =>{
        let divEvent = document.createElement('div');
        divEvent.innerHTML = `<h2 class="events_title>${event.name}</h2>
        <p class="events_description">${event.description} </p><p class="event_author">${event.author} </p>
        <button class="events_edit">Edit Event</button><button class="delete_event" data_id="${event.id}">Delete Event</button>`;
     });
}




//Delete un évenement 

function deleteEvent(/*element à supprimer*/){
    fetch(`http://localhost:3000/api/events/${eventId}`, {method: "DELETE"})
    .then((response) =>{
        if(response.ok){
            /* element a supprimer.remove*/
        }else{
            console.error("Erreur lors de la suppression de l'event")
        }
    })
    .catch((error) =>{
        console.error("Erreur lors de la suppression de l'event :", error);
    });

}

