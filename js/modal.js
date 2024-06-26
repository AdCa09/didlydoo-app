export function addNewEvent() {
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

    //Create Div
    function createDiv(type, parent, content, className) {
        const newDiv = document.createElement(type);
        if (content != null) {
            newDiv.innerHTML = content;
        }
        if (className != null) {
            newDiv.classList.add(className);
        }
        parent.appendChild(newDiv);
        return newDiv;
    }

    //Manage form

    const formContent = document.getElementById("formContent");
    const possibleDates = document.getElementById('possibleDates');
    let newEventName = document.getElementById('newEventName');
    let newEventDescri = document.getElementById('newEventDescri')
    let newEventDate = document.getElementById('newEventDate');
    let clickCount = 0;

    //Add another date
    const addNewDate = () => {
        clickCount++;
        let divName = newEventDate.id + clickCount;
        console.log(divName);
        const newDateInput = createDiv("input", possibleDates, '', divName);
        newDateInput.setAttribute("id", divName);
        newDateInput.setAttribute("type", "date");
        newDateInput.style.display = 'block';

        let deleteDateId = divName + 'del';
        const deleteDate = createDiv("button", possibleDates, 'Delete this date', deleteDateId);
        deleteDate.setAttribute("id", deleteDateId);

        console.log(deleteDate);

        const deleteDateFunction = (dateToDelete) => {
            let deleteDateTargetButton = document.getElementById(deleteDateId);
            let deleteDateTarget = document.getElementById(divName);
            deleteDateTargetButton.remove();
            deleteDateTarget.remove();
        };

        document.getElementById(deleteDateId).addEventListener("click", deleteDateFunction);
    };

    document.getElementById("addDate").addEventListener("click", addNewDate);




}