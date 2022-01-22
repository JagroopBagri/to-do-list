import { refreshTasks, addEventToDelDivs, addEventToEditDivs } from "./tasks";

// factory function that creates individual lists

function makeList(name, number){
    return {
        name,
        number
    }
};

// Function for displaying 'Add List' modal
export function showListModal(){
    // Changing CSS property of task modal so that it becomes visible 
    document.querySelector(".list-modal-container").style.display = 'flex';
};
// Function for hiding 'Add List' modal
export function hideListModal(){
    document.querySelector(".list-modal-container").style.display = 'none';
};

export function clearListModal(){
    // Clear text input field
    (document.querySelector('#list-name')).value = '';
};
// Function for showing error message when no list name is input
export function showListErrorMessage(myApp){
    // Variable that holds DOM location of 'Create List' button
    myApp.createListButton = document.querySelector('.create-list');
    // Variable that holds DOM location of List Modal
    myApp.listModalContent = document.querySelector(".list-modal-content");
    // Creating error message property on myApp object 
    myApp.listErrorMessage = document.createElement('div');
    // Adding class to error message
    myApp.listErrorMessage.classList.add('error');
    // Adding text content to error message
    myApp.listErrorMessage.textContent = 'Please input a list name';
    // Appending error message to DOM
    myApp.listModalContent.insertBefore(myApp.listErrorMessage, myApp.createListButton);
    return 0;
};
// Function that removes error message
export function removeListErrorMessage(myApp){
    // Check to see if error message was triggered before
    if(myApp.listErrorMessage){
    // Remove error message from the DOM
    myApp.listErrorMessage.remove();
    // Remove error message property from myApp object
    delete myApp.listErrorMessage;
    }
    return 0;
};
// Function that retrieves new list input 
export function retrieveListInput(myApp){
    // Remove error message if applicable
    removeListErrorMessage(myApp);
    // Variable that holds the name value
    myApp.listNameValue = (document.querySelector('#list-name')).value; 
};
// Function that updates the lists array 
export function updateListArray(myApp){
    // Don't update list array if the name field isn't completed
    if(myApp.listNameValue === ''){
        showListErrorMessage(myApp);
        return 1;
    }
    // Update Lists array with new list
    else{
        // .lists DIV selector
        myApp.listsContainer = document.querySelector('.lists'); 
        // Increase current task number by one 
        myApp.listID++; 
        // Create new task and add it to the end of tasksArray
        myApp.listsArray[myApp.listsArray.length] = makeList(myApp.listNameValue , myApp.listID); 
        return 0;
    }
};
// Function that appends all tasks in myApp.TasksArray onto DOM
export function refreshLists(myApp){
    // delete all previous lists 
    myApp.listsContainer.remove();
    // create lists container again
    myApp.listsContainer = document.createElement('div');
    myApp.listsContainer.classList.add('lists');
    // identify 'Content' DOM element in order to prepend lists container to it
    myApp.contentContainer = document.querySelector('#content');
    // prepend tasksContainer to content container
    myApp.contentContainer.prepend(myApp.listsContainer);
    myApp.listsArray.forEach(list => {
        // Create and append individual list div that goes into tasks div
        myApp.individualListContainer = document.createElement('div');
        myApp.individualListContainer.classList.add('list-container');
        myApp.individualListContainer.id = 'listcontainer' + list.number;
        myApp.listsContainer.appendChild(myApp.individualListContainer);
        // Create and append delete div 
        myApp.listDelDiv = document.createElement('div');
        myApp.listDelDiv.classList.add('del-list');
        myApp.listDelDiv.id = 'del' + list.number;
        myApp.listDelDiv.textContent = '−';
        myApp.individualListContainer.appendChild(myApp.listDelDiv);
        // Create and append name of list item
        myApp.listNameDiv = document.createElement('div');
        myApp.listNameDiv.classList.add('list-item');
        myApp.listNameDiv.id = 'list' + list.number;
        myApp.listNameDiv.textContent = list.name;
        myApp.individualListContainer.appendChild(myApp.listNameDiv);
    })
};
// Function that adds Event Listener to all 'DEL' Divs 
export function addEventToListDelDivs(myApp){
    // Get array of all list del divs
    myApp.listDelDivs = Array.from(document.querySelectorAll('.del-list'));
    // Add event listeners to every list del div
    myApp.listDelDivs.forEach(button => {
        button.removeEventListener('click', removeList);
        button.addEventListener('click', removeList);
    });
    //Function for Del buttons
    function removeList(){
        // Get the id number of delete list div that is pressed
        let delIdNumber = Number(this.id.replace(/[^0-9]/g,''));
        // Locate the index of the list associated with the specific delete div that is pressed by matching the delete div number with the specific list number
        let arrayIndex = myApp.listsArray.findIndex(array => array.number === delIdNumber);
        // identify that task container in the DOM
        let individualListContainer = document.querySelector('#listcontainer' + delIdNumber);
        // Remove that task container from the DOM
        individualListContainer.remove();
        // Remove that task object from the Lists array
        myApp.listsArray.splice(arrayIndex, 1);
    };
};
// Function that adds Event Listener to all list items
export function addEventToListItems(myApp){
    // Get array of all list items
    myApp.listItems = Array.from(document.querySelectorAll('.list-item'));
    // Add event listeners to every list item
    myApp.listItems.forEach(list => {
        list.removeEventListener('click', selectList);
        list.addEventListener('click', selectList);
    });
    // Function for list items
    function selectList(){
        // Get the number of the list-item that is clicked
        let listNum = Number(this.id.replace(/[^0-9]/g,''));
        // Change current list number to match the list num of the list clicked
        myApp.currentListNumber = listNum;
        // refresh tasks on page to match that list
        refreshTasks(myApp);
        // add event listeners to del divs
        addEventToDelDivs(myApp);
        // add event listeners to edit divs
        addEventToEditDivs(myApp)
         return 0;
    }
};