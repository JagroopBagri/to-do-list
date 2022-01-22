

//Factory function that creates individual tasks 

export function makeTask(listNumber, number, text, priority, dueDate){
    return {
        listNumber,
        number,
        text,
        priority,
        dueDate
    }
};

// Function for displaying 'Add Task' modal
export function showTaskModal(){
    // Changing CSS property of task modal so that it becomes visible 
    document.querySelector(".task-modal-container").style.display = 'flex';
};
// Function for hiding 'Add Task' modal
export function hideTaskModal(){
    document.querySelector(".task-modal-container").style.display = 'none';
};
// Function that clears Task Modal of previous values
export function clearTaskModal(){
    // Clear text input field
    (document.querySelector('#task-input')).value = '';
    // Clear Date Due field
    (document.querySelector('#dueDate-input')).value = '';
    // Clear Priority field
    (document.querySelector('#priority-input')).value = 'none';
    // 'Create Task' Button text says 'create button'
    (document.querySelector('.create-task')).textContent = 'Create Task';
}
// Function for showing error message when one or more fields have not been completed
export function showErrorMessage(myApp){
    // Variable that holds DOM location of 'Create Task' button
    myApp.createTaskButton = document.querySelector('.create-task');
    // Variable that holds DOM location of Task Modal
    myApp.taskModalContent = document.querySelector(".task-modal-content");
    // Creating error message property on myApp object 
    myApp.errorMessage = document.createElement('div');
    // Adding class to error message
    myApp.errorMessage.classList.add('error');
    // Adding text content to error message
    myApp.errorMessage.textContent = 'Please complete every field';
    // Appending error message to DOM
    myApp.taskModalContent.insertBefore(myApp.errorMessage, myApp.createTaskButton);
    return 0;
};
// Function that removes error message
export function removeErrorMessage(myApp){
    // Check to see if error message was triggered before
    if(myApp.errorMessage){
    // Remove error message from the DOM
    myApp.errorMessage.remove();
    // Remove error message property from myApp object
    delete myApp.errorMessage;
    }
    return 0;
};
// Function that retrieves new task input 
export function retrieveTaskInput(myApp){
    // Remove error message if applicable
    removeErrorMessage(myApp);
    // Variable that holds the text value
    myApp.taskTextValue = (document.querySelector('#task-input')).value; 
    // Variable that holds the priority value
    myApp.taskPriorityValue = (document.querySelector('#priority-input')).value; 
    // Variable that holds the due date value
    myApp.taskDueDateValue = (document.querySelector('#dueDate-input')).value; 
};
// Function that updates the tasks array 
export function updateTaskArray(myApp){
    // Don't update task array if all fields aren't completed
    if(myApp.taskTextValue === '' || myApp.taskPriorityValue === 'none' || myApp.taskDueDateValue === ''){
        showErrorMessage(myApp);
        return 1;
    }
    // Update tasks array with new task
    else{
        // .tasks DIV selector
        myApp.tasksContainer = document.querySelector('.tasks'); 
        // Increase current task number by one 
        myApp.taskID++; 
        // Create new task and add it to the end of tasksArray
        myApp.tasksArray[myApp.tasksArray.length] = makeTask(myApp.currentListNumber, myApp.taskID, myApp.taskTextValue, myApp.taskPriorityValue, myApp.taskDueDateValue); 
        return 0;
    }
};
// Function that appends all tasks in myApp.TasksArray onto DOM
export function refreshTasks(myApp){
    // delete all previous tasks 
    myApp.tasksContainer.remove();
    // create tasks container again
    myApp.tasksContainer = document.createElement('div');
    myApp.tasksContainer.classList.add('tasks');
    // identify 'Content' DOM element in order to append tasks container to it
    myApp.contentContainer = document.querySelector('#content');
    // append tasksContainer to content container
    myApp.contentContainer.appendChild(myApp.tasksContainer);
    myApp.tasksArray.forEach(task => {
        // check to see if task meets list number before appending to DOM
        console.log(task.listNumber)
        console.log(myApp.currentListNumber);
        if(task.listNumber === myApp.currentListNumber && myApp.currentListNumber != 0){
            // Create and append individual task div that goes into tasks div
            myApp.individualTaskContainer = document.createElement('div');
            myApp.individualTaskContainer.classList.add('list' + task.listNumber + '-task' + task.number);
            myApp.individualTaskContainer.classList.add('task');
            myApp.individualTaskContainer.id = 'task' + task.number;
            myApp.tasksContainer.appendChild(myApp.individualTaskContainer);
            // Create task beginning and task ending divs
            myApp.taskBeginning = document.createElement('div');
            myApp.taskBeginning.classList.add('task-beginning');
            myApp.individualTaskContainer.appendChild(myApp.taskBeginning);
            myApp.taskEnding = document.createElement('div');
            myApp.taskEnding.classList.add('task-ending');
            myApp.individualTaskContainer.appendChild(myApp.taskEnding);
            // Create and append "priority" elements that go into task beginning div
            myApp.priorityDiv = document.createElement('div');
            myApp.priorityDiv.classList.add('priority');
            myApp.taskBeginning.appendChild(myApp.priorityDiv);
            myApp.priority = document.createElement('div');
            myApp.priority.classList.add(task.priority);
            myApp.priority.id = 'priority' + task.number;
            myApp.priority.textContent = "•";
            myApp.priorityDiv.appendChild(myApp.priority);
            // Create and append "text" elements that go into task beginning div
            myApp.textDiv = document.createElement('div');
            myApp.textDiv.classList.add('item-content');
            myApp.taskBeginning.appendChild(myApp.textDiv);
            myApp.text = document.createElement('div');
            myApp.text.classList.add('task-item');
            myApp.text.id = 'task-text' + task.number;
            myApp.text.textContent = task.text;
            myApp.textDiv.appendChild(myApp.text);
            // Create and append edit div that goes into task ending div
            myApp.editDiv = document.createElement('div');
            myApp.editDiv.classList.add('edit');
            myApp.editDiv.id = 'task-edit' + task.number;
            myApp.editDiv.textContent = '✎';
            myApp.taskEnding.appendChild(myApp.editDiv);
            // Create and append delete div that goes into task ending div
            myApp.delDiv = document.createElement('div');
            myApp.delDiv.classList.add('del');
            myApp.delDiv.id = 'task-del' + task.number;
            myApp.delDiv.textContent = '✖';
            myApp.taskEnding.appendChild(myApp.delDiv);
            // Create and append due date div that goes into task ending div
            myApp.dueDiv = document.createElement('div');
            myApp.dueDiv.classList.add('dueDate');
            myApp.dueDiv.id = 'task-due' + task.number;
            myApp.dueDiv.textContent = task.dueDate
            myApp.taskEnding.appendChild(myApp.dueDiv);
            return 0;
        }
        else{
            return 1;
        }
    })
};
// Function that adds Event Listener to all 'DEL' Divs 
export function addEventToDelDivs(myApp){
    // Get array of all del buttons
    myApp.delDivs = Array.from(document.querySelectorAll('.del'));
    // Add event listeners to every del div
    myApp.delDivs.forEach(button => {
        button.removeEventListener('click', removeTask);
        button.addEventListener('click', removeTask);
    });
    //Function for Del buttons
    function removeTask(){
        // Get the id number of delete div that is pressed
        let delIdNumber = Number(this.id.replace(/[^0-9]/g,''));
        // Locate the index of the task associated with the specific delete div that is pressed by matching the delete div number with the specific task number
        let arrayIndex = myApp.tasksArray.findIndex(array => array.number === delIdNumber);
        // identify that task container in the DOM
        let individualTaskContainer = document.querySelector('#task' + delIdNumber)
        // Remove that task container from the DOM
        individualTaskContainer.remove();
        // Remove that task object from the Tasks array
        myApp.tasksArray.splice(arrayIndex, 1);
    };
};
// Function that adds Event Listener to all 'EDIT' Divs 
export function addEventToEditDivs(myApp){
    // Get array of all edit buttons
    myApp.editDivs = Array.from(document.querySelectorAll('.edit'));
    // Add event listeners to every edit div
    myApp.editDivs.forEach(button => {
        button.removeEventListener('click', editTask);
        button.addEventListener('click', editTask);
    });
    function editTask(){
         // Get the id number of edit div that is pressed
        let editIdNumber = Number(this.id.replace(/[^0-9]/g,''));
        // Locate the index of the task associated with the specific edit div that is pressed by matching the edit div number with the specific task number
        let arrayIndex = myApp.tasksArray.findIndex(array => array.number === editIdNumber);
        // Make text input field equal to task text
        (document.querySelector('#task-input')).value = myApp.tasksArray[arrayIndex].text;
        // Make Date Due field equal to task due date
        (document.querySelector('#dueDate-input')).value = myApp.tasksArray[arrayIndex].dueDate;
        // Make priority field equal to task priority
        (document.querySelector('#priority-input')).value = myApp.tasksArray[arrayIndex].priority;
        // 'Create Task' Button text says 'edit button'
        (document.querySelector('.create-task')).textContent = 'Edit Task';
        // Display the Task Modal
        showTaskModal();
        // Create variable for the 'Cancel' button in the DOM
        let cancelTaskButton = document.querySelector(".cancel-task");
        // Create variable for the 'edit Task' button in the DOM
        let editTaskButton = document.querySelector(".create-task");
        // Add Event Listener to the 'Cancel' button
        cancelTaskButton.addEventListener('click', cancel);
         // Function for the 'Cancel' Button
        function cancel(){
        // Hide the Task Modal
        hideTaskModal();
        // Remove the event listener on the 'cancel' button
        cancelTaskButton.removeEventListener('click', cancel);
        // Remove the event listener on the 'edit task' button
        editTaskButton.removeEventListener('click', edit);
        };
        // Add Event Listener to the 'Edit Task' button
        editTaskButton.addEventListener('click', edit);
        // Function for the 'Create Task' button
        function edit(){
            // retrieve the task input
            retrieveTaskInput(myApp);
            if(myApp.taskTextValue === '' || myApp.taskPriorityValue === 'none' || myApp.taskDueDateValue === ''){
                showErrorMessage(myApp);
                return 1;
            }
            else{
                cancelTaskButton.removeEventListener('click', cancel);
                editTaskButton.removeEventListener('click', edit);
                // update task object information in array
                myApp.tasksArray[arrayIndex].text = myApp.taskTextValue;
                myApp.tasksArray[arrayIndex].priority = myApp.taskPriorityValue;
                myApp.tasksArray[arrayIndex].dueDate = myApp.taskDueDateValue;
                // update the DOM
                // identify elements in DOM that need to be changed
                (document.querySelector('#priority' + myApp.tasksArray[arrayIndex].number)).className = myApp.tasksArray[arrayIndex].priority;
                (document.querySelector('#task-text' + myApp.tasksArray[arrayIndex].number)).textContent = myApp.tasksArray[arrayIndex].text;
                (document.querySelector('#task-due' + myApp.tasksArray[arrayIndex].number)).textContent = myApp.tasksArray[arrayIndex].dueDate;
                hideTaskModal();
            }
        }
    }

};
