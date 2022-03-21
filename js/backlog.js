let backlogTasks = [];

// function renders all Tasks in which are sposed to be in backlog by filtering the array allTasks
async function renderTasksInBacklog(onload = false) {
    if (onload) {
        
        await init();

    }
    backlogTasks = allTasks.filter(task => task.status == 'backlog');

        renderCards();
    
}

// renders the tasks in the Backlog

function renderCards() {
    let backlogContent = document.getElementById('card-body');
    backlogContent.innerHTML = "";

    if (backlogTasks.length == 0) {
        getId('headerOfCard').classList.add('invisible');
        backlogContent.innerHTML = "<div>There are no tasks in backlog</div>";
    } else {
        for (let i = 0; i < backlogTasks.length; i++) {

            let task = backlogTasks[i];

            backlogContent.innerHTML += renderCardsHTML(i, task);
        }
    }
}
// this is the inner.HTML for renderCards() function
function renderCardsHTML(i, task){
    return                 `<div id="card${i}" onclick="showCard(${i})" class="card shadow bd-imp-${task.importance}">
    <div class="card-body cardInBacklog mb-4">
        <div class="staff-container">${getStaff(i)}</div>

        <div class="date mb-2">${task.dueDate}</div>
        <div class="fw-bold d-lg-none">Delete date</div>
        <p class="category mb-2">${task.category}<p>
        <div class="fw-bold d-lg-none  mt-1">Category</div>
        <p class="title mb-2">${task.title}<p>
        <div class="fw-bold d-lg-none mt-1">Title</div>
        <div class="importance" id="importance${i}"><div>
    </div>
    <div class="iconsInCards">
            <img src="./img/paperplane.png" onclick="event.stopPropagation();moveToBoard(${i})" class="plane-icon" title="move to board">
            <img onclick="event.stopPropagation();deleteTask(${i})" title="delete this card" class="trashbin" src="./img/delete.png">
        </div>
</div>`
}


/**
 * creates html code for showing icons with name and email address of assigned people
 * if assignedTo is empty the plus icon is diplayed with a message
 * @param {integer} i - index of task in backlogTasks
 * @returns html code
 */
function getStaff(i) {
    let staff = backlogTasks[i].assignedTo;
    let html = '';

    if (staff.length > 0) {
        for (let index = 0; index < staff.length; index++) {
            const teamMember = staff[index];
            html += userIconNameMail(teamMember, false);
        }
    }
    else {
        html += `
        <div class="assignTask">
            <img class="plus-icon" src="./img/icon plus.png">
            <p>Click card to assign task!</p>
        </div>`;
    }
    return html;
}


/**
 * deletes task from backlog
 * @param {integer} i - index of task in backlogTasks
 */
function deleteTask(i) {
    let idToDelete = backlogTasks[i].id;
    let indexToDelete = allTasks.findIndex(task => task.id == idToDelete);

    allTasks[indexToDelete].deletedFrom = allTasks[indexToDelete].status;
    allTasks[indexToDelete].status = "trash";
    allTasks[indexToDelete].deleteDate = today;
    save(allTasks, 'tasks');

    renderTasksInBacklog();


}


/**
 * shows details for previous task in backlog if possible
 * @param {integer} i - index on backlog
 */
function previousCard(i) {
    if (i == 0) {
        document.getElementById('nextTask').classList.add('background-color-grey');
        alert('This is the first task.');
    } else {
        i--;
    }
    showCard(i, 'backlog');
}


/**
 * shows details for next task in backlog if possible
 * @param {integer} i - index on backlog
 */
function nextCard(i) {
    if (i == backlogTasks.length - 1) {
        alert('No more tasks available.')
        document.getElementById('nextTask').classList.add('background-color-grey');
    } else {
        i++;
    }
    showCard(i, 'backlog');
}


/**
 * changes the status of the task to 'todo'
 * @param {integer} i - index of task in backlogTasks
 */
function moveToBoard(i) {
    backlogTasks[i].status = 'todo';
    save(allTasks, 'tasks');
    renderTasksInBacklog();
}


// function changeCategory(i, page) {
//     let categorySelector = getId('card-category');

//     let selectedCategory = categorySelector[categorySelector.selectedIndex].value;

//     if (page == 'board') {
//         allTasks[i].category = selectedCategory;
//     } else {
//         backlogTasks[i].category = selectedCategory;
//     }
// }


// function showAssignedUsers() {
//     let assignedTo = getId('card-assigned-to');
//     assignedTo.innerHTML = '';
//     for (let i = 0; i < currentTask.assignedTo.length; i++) {
//         const name = currentTask.assignedTo[i];
//         assignedTo.innerHTML += userIconNameMail(name);;
//     }
//     if (moreStaffAllowed()) {
//         assignedTo.innerHTML += addUserHtml();
//         fillAssignedToList();
//     }
// }


// /**
//  * creates html code to show the icon, name and email address of a user
//  * @param {string} name - name of (assigned) user
//  * @returns html code
//  */
// function userIconNameMail(name, clickable = true) {
//     return `<div class="userContent">
//                 ${staffIconHtml(name, clickable)}
//                 <div class="userAndMail">
//                     <p>${users[name].name}</p>
//                     <p><a href="mailto:${users[name].email}"}>${users[name].email}</a></p>
//                 </div>
//             </div>`;
// }