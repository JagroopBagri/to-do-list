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
// function that puts task in DOM 

function taskToDom(){
    let taskText = document.querySelector('#task-input').value;
    let taskPriority = document.querySelector('#priority-input').value;
    let taskDueDate = document.querySelector('#dueDate-input').value;

};

export { makeTask };