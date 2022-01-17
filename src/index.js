import { makeList } from "./lists";
import { makeTask } from "./Tasks";

// main function that makes the whole application work
function operateApp(){
    let buttonBox = document.querySelector('.buttonBox');
    let addTaskButton = document.querySelector('.addTask');
    let addListButton = document.querySelector('.addList');
    let contentDiv = document.querySelector('#content');
    let listsDiv = document.querySelector('.lists');
    let tasksDiv = document.querySelector('.tasks');
    addTaskButton.addEventListener('click', function(){
        document.querySelector('.task-modal-container').style.display = 'flex';
        let cancelButton = document.querySelector('.cancel-task');
        cancelButton.addEventListener('click', function(){
            document.querySelector('.task-modal-container').style.display = 'none';
        })
    })
};
operateApp();