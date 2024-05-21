export async function deleteEvent(id) {
    await fetch(`http://localhost:3000/api/events/${id}/`, {
        method: 'DELETE',
    })
    .then((response) => response.json())
    .then((response) => console.log('response:', response))
    .catch((error) => console.error('Erreur lors de la suppression:', error));
}