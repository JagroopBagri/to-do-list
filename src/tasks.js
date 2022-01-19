import { format } from "../node_modules/date-fns";

//factory function that creates individual tasks 

function makeTask(listNumber, number, text, priority, dueDate){
    return {
        listNumber,
        number,
        text,
        priority,
        dueDate
    }
};

// function for "Add Task" button event listener
function addTask(task, taskIDArray, currentListNumber){
    if(document.querySelector('.error')){
        (document.querySelector('.error')).remove();
    }
    let error = false;
    let errorMessage;
    document.querySelector('.task-modal-container').style.display = 'flex';
    let cancelButton = document.querySelector('.cancel-task');
    // function for cancel button event listener, so it can be removed later
    function cancelButtonEvent(){
        if(error === true){
            errorMessage.remove();
        }
        document.querySelector('.task-modal-container').style.display = 'none';
        (document.querySelector('#task-input')).value = '';
        (document.querySelector('#priority-input')).value = 'none';
        (document.querySelector('#dueDate-input')).value = '';
        cancelButton.removeEventListener('click', cancelButtonEvent);
    }
    cancelButton.addEventListener('click', cancelButtonEvent);
    let createButton = document.querySelector('.create-task');
    createButton.addEventListener('click', function createButtonEvent(){
        let taskText = (document.querySelector('#task-input')).value;
        let taskPriority = (document.querySelector('#priority-input')).value;
        let taskDueDate = (document.querySelector('#dueDate-input')).value;
        let taskModal = document.querySelector('.task-modal-content');
        let tasksContainer = document.querySelector('.tasks');
        if(document.querySelector('.error')){
            (document.querySelector('.error')).remove();
        }
        errorMessage = document.createElement('div');
        errorMessage.classList.add('error');
        errorMessage.textContent = 'Please complete every field';
        if(taskText === '' || taskPriority === 'none' || taskDueDate === ''){
            taskModal.insertBefore(errorMessage, createButton);
            error = true;
        }
        else{
            if(error === true){
                error = false;
                errorMessage.remove();
            }
            cancelButton.removeEventListener('click', cancelButtonEvent);
            taskIDArray[0] ++;
            task[task.length] = makeTask(currentListNumber, taskIDArray[0], taskText, taskPriority, taskDueDate);
            // create and append task div that goes into tasks div
            let taskBox = document.createElement('div');
            taskBox.classList.add('list' + currentListNumber + '-task' + taskIDArray[0]);
            taskBox.classList.add('task');
            taskBox.id = 'task' + taskIDArray[0];
            tasksContainer.appendChild(taskBox);
            // create task beginning and task ending divs
            let taskBeginning = document.createElement('div');
            taskBeginning.classList.add('task-beginning');
            taskBox.appendChild(taskBeginning);
            let taskEnding = document.createElement('div');
            taskEnding.classList.add('task-ending');
            taskBox.appendChild(taskEnding);
            // create and append elements that go into task beginning div
            let priorityDiv = document.createElement('div');
            priorityDiv.classList.add('priority');
            taskBeginning.appendChild(priorityDiv);
            let priority = document.createElement('div');
            priority.classList.add(taskPriority);
            priority.id = 'priority' + taskIDArray[0];
            priority.textContent = "•";
            priorityDiv.appendChild(priority);
            let textDiv = document.createElement('div');
            textDiv.classList.add('item-content');
            taskBeginning.appendChild(textDiv);
            let text = document.createElement('div');
            text.classList.add('task-item');
            text.id = 'task-text' + taskIDArray[0];
            text.textContent = taskText;
            textDiv.appendChild(text);
            // create and append elements that go into task ending div
            let editDiv = document.createElement('div');
            editDiv.classList.add('edit');
            editDiv.id = 'task-edit' + taskIDArray[0];
            editDiv.textContent = '✎';
            taskEnding.appendChild(editDiv);
            let delDiv = document.createElement('div');
            delDiv.classList.add('del');
            delDiv.id = 'task-del' + taskIDArray[0];
            delDiv.textContent = '✖';
            taskEnding.appendChild(delDiv);
            let dueDiv = document.createElement('div');
            dueDiv.classList.add('dueDate');
            dueDiv.id = 'task-due' + taskIDArray[0];
            dueDiv.textContent = format(new Date(taskDueDate), "P");
            taskEnding.appendChild(dueDiv);
            document.querySelector('.task-modal-container').style.display = 'none';
            // reset add task fields 
            (document.querySelector('#task-input')).value = '';
            (document.querySelector('#priority-input')).value = 'none';
            (document.querySelector('#dueDate-input')).value = '';
            // add event listener to delete button
            let num = taskIDArray[0];
            delDiv.addEventListener('click', function delTask(){
                let spliceNum = task.find(x => x.number === num)
                task.splice(spliceNum, 1);
                taskBox.remove();
                delDiv.removeEventListener('click', delTask);
            })
            // add event listener to edit button
            editDiv.addEventListener('click', function editTask(){
                document.querySelector('.task-modal-container').style.display = 'flex';
                cancelButton.addEventListener('click', cancelButtonEvent);

            })
        }
    })
};


export { makeTask, addTask };