import { makeList, addList } from "./lists";
import { makeTask, addTask } from "./Tasks";

// main function that makes the whole application work
function operateApp(){
    // DOM elements
    let task = [];
    let buttonBox = document.querySelector('.buttonBox');
    let addTaskButton = document.querySelector('.addTask');
    let addListButton = document.querySelector('.addList');
    let contentDiv = document.querySelector('#content');
    let listsDiv = document.querySelector('.lists');
    let listItems = Array.from(document.querySelectorAll('.list-item'));
    let taskItems = Array.from(document.querySelectorAll('.task'));
    let tasksDiv = document.querySelector('.tasks');
    //Counter Variables
    // listID shows the largest number id for a list-item
    let listID = (function(){
        // convert list IDs to only numbers (ex. change "list1" to "1")
        let idNumberArray = listItems.map(list => (list.id).replace(/[^0-9]/g,''))
        // get largest number from array
        let largestNumber = idNumberArray.reduce((a, b) => {
            if (b > a)(
                a = b
            )
            return a;
        })
        return Number(largestNumber);
    })();
    // make listID mutable by putting it into an array
    let listIDArray = [listID]
    //taskID shows the largest number id for a list-item   
    let taskID = (function(){
        // convert list IDs to only numbers (ex. change "list1" to "1")
        let idNumberArray = taskItems.map(task => (task.id).replace(/[^0-9]/g,''))
        // get largest number from array
        let largestNumber = idNumberArray.reduce((a, b) => {
            if (b > a)(
                a = b
            )
            return a;
        })
        return Number(largestNumber);
    })();
    // make taskID mutable by putting it into an array
    let taskIDArray = [taskID]
    // currentListNumber starts off being the lowest id for list-items
    let currentListNumber = (function(){
        // convert list IDs to only numbers (ex. change "list1" to "1")
        let idNumberArray = listItems.map(list => (list.id).replace(/[^0-9]/g,''))
        // get largest number from array
        let smallestNumber = idNumberArray.reduce((a, b) => {
            if (a > b)(
                a = b
            )
            return a;
        })
        return Number(smallestNumber);
    })();
    // add task button event listener
    addTaskButton.addEventListener('click', function(){
        addTask(task, taskIDArray, currentListNumber);
    })
    // add list button event listener
    addListButton.addEventListener('click', addList)
};
operateApp();