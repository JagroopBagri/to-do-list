// factory function that creates individual lists

function makeList(name, number){
    return {
        name,
        number
    }
};

// function for "Add List" button event listener

function addList(){
    document.querySelector('.list-modal-container').style.display = 'flex';
    let cancelButton = document.querySelector('.cancel-list');
    cancelButton.addEventListener('click', function(){
        document.querySelector('.list-modal-container').style.display = 'none';
    })
};

export { makeList, addList };