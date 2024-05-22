export function addAttendees(element, eventData){


    //variable avec le tableaux à insérer ci dessous : 

    const containersForm = document.querySelectorAll("");//inclure container du form au html
    const table = document.querySelector("");//inclure table du html
    const form = document.getElementById("");//inclure form du html
    const userNameInput = document.getElementById('');//inclure inputNameUSer du html
    const submit = document.createElement('button');



    eventData.dates.forEach((date) => {
        const dateValue = date.date;
        console.log(dateValue);
        const checkbox=document.getElementById(''); //checkbox à inclure 
        checkbox.value='checkbox';
        checkbox.checked=false;
        form.appendChild(checkbox);
    });

    submit.addEventListener('click', function(){
        alert("it's been pushing")

        const attendeesName = attendeesNameInput.value;

        if(!name){
            alert('You need to put a name');
            return;
        }

        dates=[];
        let dates={
            date:dateValue,
            avaible:checkbox.checked,
        };
        const avaible = checkbox.checked;
        const data ={
            name:name,
            date:dateValue,
        };

        

        attendeesNameInput.value = '';
    });

    
      
} 