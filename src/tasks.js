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

function domTask(task){
    
}




export { makeTask };