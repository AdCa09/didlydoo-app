// POST method nouvel événement
export function createEvent(newEvent) {
    const server = "http://localhost:3000/api/events/";

    fetch(server, {
        method: "POST",
        headers: {
            "Content-Type": "apllication/json,"
        },
        body: JSON.stringify(newEvent)
    }).catch((error) => {
        console.error("Une erreur s'est produite", error);
    });
}

//GET method 

export async function fetchData() {
    const server = "http://localhost:3000/api/events";
    try {
        const response = await fetch(server, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Une erreur s'est produite", error);
        throw error;
    }
}

fetchData()
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log("Une erreur s'est produite", error);
    });

//PATCH method event et id 
export async function updateEvent(event, id) {
    const server = `http://localhost:3000/api/events/${id}/`
    await fetch(server, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event)
    }).then((response) => response.json())
        .then((data) => {
            console.log(data);
        }).catch((error) => {
            alert("Une erreur s'est produite :", error);
        });
}
//DELETE method by id 
export async function deleteEvent(id) {
    await fetch(`http://localhost:3000/api/events/${id}/`, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then((response) => console.log("response:", response))
        .catch((error) => console.error("Erreur lors de la suppression:", error));
}

//POST attendee 
export function createAttendeeForEvent(attendee, eventId) {
    const server = `http://localhost:3000/api/events/${eventId}/attend`
    fetch(server, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(attendee)

    }).catch((error) => {
        console.error("Une erreur s'est produite :", error);
    });
}

