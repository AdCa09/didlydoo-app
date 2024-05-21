const server = 'http://localhost:3000';

export async function fetchUpdateEvent(id, e, updateEvent){
    e.preventDefault();
    console.log('id from fetchUpdateEvent:', updatedEvent);
    console.log('updatedEvent from fetchUpdateEvent:', id);

    try{
        const response = await fetch(`${url}/api/events/${id}/`,{
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(updateEvent),
        });

        if(response.ok){
            console.log("L'évenement a été mis à jour.")
        }else{
            const errorUpdate = await response.json();
            console.error("Impossible de mettre à jour l'événement.", errorUpdate);
        };
    }catch (error){
        console.error("Impossible d'efféctuer la requête PATCH 'fetchUpdateEvent':", error);
    }

}
