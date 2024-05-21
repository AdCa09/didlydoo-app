export const Data= async () => {
    const response = await fetch("http://localhost:3000/api/events",{
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
        },
    });
    const data = await response.json();
    return data;
}
Data();

