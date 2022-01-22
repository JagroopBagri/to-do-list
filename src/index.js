import { showListModal, hideListModal, clearListModal, showListErrorMessage, removeListErrorMessage, retrieveListInput, updateListArray, refreshLists, addEventToListDelDivs, addEventToListItems } from "./lists";
import {  retrieveTaskInput, updateTaskArray, refreshTasks, showTaskModal, hideTaskModal, clearTaskModal, removeErrorMessage, addEventToEditDivs, addEventToDelDivs} from "./tasks";

// Main IIFE function that makes the whole application work
(function operateApp(){
    // Object that every function has access to. Variables will be stored in it. 
    const myApp = {}; 
    // Function that creates variables storing DOM elements to be used by multiple functions
    function createStaticVariables(myApp){
        // Stores all tasks 
        myApp.tasksArray = []; 
        // Stores all lists
        myApp.listsArray = [];
        // Get array of all the lists in DOM
        myApp.listItems = Array.from(document.querySelectorAll('.list-item')); 
        // Get array of all the tasks in DOM
        myApp.taskItems = Array.from(document.querySelectorAll('.task')); 
        // Current list number that the user is in
        myApp.currentListNumber = 1;
        // Variable that records the number of tasks that have been created
        myApp.taskID = (function(){
            // Convert task IDs to only numbers (ex. change "task1" to "1")
            let idNumberArray = myApp.taskItems.map(task => (task.id).replace(/[^0-9]/g,''));
            // Get largest number from array
            let largestNumber = idNumberArray.reduce((a, b) => {
                if (b > a)(
                    a = b
                )
                return a;
            })
            return Number(largestNumber);
        })();
        // Variable that records the number of tasks that have been created
        myApp.listID = (function(){
            // Convert list IDs to only numbers (ex. change "list1" to "1")
            let idNumberArray = myApp.listItems.map(list => (list.id).replace(/[^0-9]/g,''));
            // Get largest number from array
            let largestNumber = idNumberArray.reduce((a, b) => {
                if (b > a)(
                    a = b
                )
                return a;
            })
            return Number(largestNumber);
        })();
        // Variable for 'Add Task' button
        myApp.addTaskButton = document.querySelector('.addTask');
        // Variable for 'Add List' button
        myApp.addListButton = document.querySelector('.addList');
        return 0;
    };
    // Invoke createStaticVariables Function
    createStaticVariables(myApp);
    // Add event listener to 'Add Task' button
    myApp.addTaskButton.addEventListener('click', function addTask(){
        // Clear Task Modal of previous values and inputs
        clearTaskModal();
        // Remove error message if applicable
        removeErrorMessage(myApp);
        // Display the Task Modal
        showTaskModal();
        // Create variable for the 'Cancel' button in the DOM
        let cancelTaskButton = document.querySelector(".cancel-task");
        // Create variable for the 'Create Task' button in the DOM
        let createTaskButton = document.querySelector(".create-task");
        // Add Event Listener to the 'Cancel' button
        cancelTaskButton.addEventListener('click', cancel);
         // Function for the 'Cancel' Button
        function cancel(){
        // Hide the Task Modal
        hideTaskModal();
        // Remove the event listener on the 'cancel' button
        cancelTaskButton.removeEventListener('click', cancel);
        // Remove the event listener on the 'create task' button
        createTaskButton.removeEventListener('click', create);
        };
        // Add Event Listener to the 'Create Task' button
        createTaskButton.addEventListener('click', create);
        // Function for the 'Create Task' button
        function create(){
            retrieveTaskInput(myApp);
            // Remove event listener from create task button and cancel button if creating new task is successful
            if(updateTaskArray(myApp) === 0){
            createTaskButton.removeEventListener('click', create);
            cancelTaskButton.removeEventListener('click', cancel);
            //hide task Modal
            hideTaskModal();
            //update tasks
            refreshTasks(myApp);
            // add event listeners to del divs
            addEventToDelDivs(myApp);
            // add event listeners to edit divs
            addEventToEditDivs(myApp)
            return 0;
            }
        }
    });
    // Add event listener to 'Add List' button
    myApp.addListButton.addEventListener('click', function addList(){
        // Clear List Modal of previous values
        clearListModal();
        // Remove any error messages that could have been present
        removeListErrorMessage(myApp);
        // Display the list modal
        showListModal();
        // Create variable for the 'Cancel' button in the DOM
        let cancelListButton = document.querySelector(".cancel-list");
        // Create variable for the 'Create List' button in the DOM
        let createListButton = document.querySelector(".create-list");
        // Add Event Listener to the 'Cancel' button
        cancelListButton.addEventListener('click', cancel);
         // Function for the 'Cancel' Button
        function cancel(){
        // Hide the List Modal
        hideListModal();
        // Remove the event listener on the 'cancel' button
        cancelListButton.removeEventListener('click', cancel);
        // Remove the event listener on the 'create List' button
        createListButton.removeEventListener('click', create);
        };
         // Add Event Listener to the 'Create List' button
         createListButton.addEventListener('click', create);
         // Function for the 'Create List' button
         function create(){
             retrieveListInput(myApp);
             // Remove event listener from create List button and cancel button if creating new List is successful
             if(updateListArray(myApp) === 0){
             createListButton.removeEventListener('click', create);
             cancelListButton.removeEventListener('click', cancel);
             //hide List Modal
             hideListModal();
             //update Lists
             refreshLists(myApp);
             // add event listeners to del divs
             addEventToListDelDivs(myApp);
             // Add event listener to List items
            addEventToListItems(myApp);
             return 0;

             }
         }
    });
})();
