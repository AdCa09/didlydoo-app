export const Data= async () => {
    const response = await fetch("http://localhost:3000/api/events",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },

    });



    const data = await response.json();
    return data;
}
Data()
 .then(data =>{
    console.log(data);
})
.catch(error =>{
    console.log("Une erreur s'est produite", error);
})

