let allTasks = [];
let users = {};
let categories = [];
//maximum number of people that can be assigned to one task
let maxTeamSizePerTask;
//maximum number of active tasks (in progress, testing) that one person can be assigned to
let maxActiveTasksPerUser;
let highestTaskId = -1;
let currentTask = {};
let now = new Date();
let today = now.toISOString().slice(0, 10);

/* helper function */
function getId(id) {
    return document.getElementById(id);
}


function checkActiveTasks() {
    for (const name in users) {
        console.log(users[name].name + ': ' + users[name].activeTasks);
    }
}
///////////////////////////////////////////////////////////////////
//functions concerning menu

/**
 * switches between menu shown and hidden (narrow screens only)
 */
function toggleMenu() {
    let menubar = getId('menubar');
    if (menubar.style.left == 'var(--menu-width-neg)' || menubar.style.left == '') {
        menubar.style.left = '0';
    } else {
        menubar.style.left = 'var(--menu-width-neg)';
    }
}


/**
 * hides menu (narrow screens only)
 */
function hideMenu() {
    let menubar = getId('menubar');
    menubar.style.left = 'var(--menu-width-neg)';
}

///////////////////////////////////////////////////////////////////
//functions concerning assigned to

/**
 * 
 * @param {string} user - name of a user
 * @returns either the image or the initials of a user
 */
function staffIconContent(user) {
    if (users[user].img) {
        return `<img title="${users[user].name}" src="${users[user].img}">`;
    } else {
        return `${users[user].initials}`;
    }
}


/**
 * creates html code for staff icons 
 * if clickable is true, a drop down list is appended to the icon, showing name and email of the user and allowing to remove the user from the assignedTo array
 * @param {string} user 
 * @param {boolean} clickable - true if icon must have a drop down list
 * @returns 
 */
function staffIconHtml(user, clickable = true) {
    if (clickable) {
        return `
        <div class="btn-group dropend">
            <span class="staff-icon p-2 me-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">${staffIconContent(user)}</span>
            ${dropDownHtml(user)}            
        </div>
        `;
    }
    else {
        return `<span class="staff-icon p-2 me-1">${staffIconContent(user)}</span>`;
    }
}

/**
 * creates html code for drop down appended to a staff icon
 * content: name, email, possibility to remove user from assignedTo array
 * @param {string} user - name of user
 * @returns html code
 */
function dropDownHtml(user) {
    return `<ul class="dropdown-menu">
                 <li>
                    <span class="dropdown-item disabled">${user}</span>
                 </li>
                 <li>
                    <a class="dropdown-item" href="mailto:${users[user].email}">${users[user].email}</a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                    <a class="dropdown-item" onclick = "removeUser('${user}')">Remove from task</a>
                </li>
            </ul>`;
}


/**
 * true, if task may be assigned to more users
 * @returns boolean
 */
function moreStaffAllowed() {
    return currentTask.assignedTo.length < maxTeamSizePerTask;
}


/**
 * creates html code for plus icon and dropdown list
 * @returns string - html code 
 */
function addUserHtml() {
    return `<div class="btn-group dropend">
                <img id="plus-icon" type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" src="img/icon plus.png" alt="add team member" title="add team member">

                <ul id="assigned-to-list" class="dropdown-menu p-2">
                </ul>
            </div>`
}


/**
 * returns the html code for a list item consisting of an icon with the image or the initials of the user and the name of the user
 * @param {string} name - name of a user
 * @returns html code
 */
function itemMaker(name) {
    return `
        <li onclick = "assignUser('${users[name].name}')">
           <div class="d-flex"> ${staffIconHtml(name, false)} 
            <span>${users[name].name}<span>
            </div>
        </li >
    `;
}


/**
 * fills the drop down menu in the "assigned-to" section with all users (json)
 * already assigned users are excluded
 */
function fillAssignedToList() {
    let list = getId('assigned-to-list');
    list.innerHTML = '';
    for (const name in users) {
        if (!userAlreadyAssigned(users[name].name)) {
            list.innerHTML += itemMaker(users[name].name);
        }
    }
}


/**
 * true if name is already assigned to currentTask
 * @param {string} name - name of user to check
 * @returns boolean 
 */
function userAlreadyAssigned(name) {
    return currentTask.assignedTo.includes(users[name].name);
}


/**
 * removes a user form being assigned to a task
 * updates the presentation of assigned to users
 * @param {string} name - name of user in array assignedTo 
 */
function removeUser(name) {
    currentTask.assignedTo = currentTask.assignedTo.filter(user => user != name);
    showAssignedUsers();
}


/**
 * name of selected user is pushed to assignedTo array of currentTask
 * user is shown in form
 * @param {string} name - name of selected user
 */
function assignUser(name) {
    currentTask.assignedTo.push(name);
    showAssignedUsers();
}


/**
 * creates html code for icon and name for each person assigned to a task
 * @param {integer} i -index of the task 
 * @returns html code
 */
function getTeam(i) {
    let team = allTasks[i].assignedTo;
    let html = '';
    if (team.length > 0) {
        html += '<div class="px-0">';
        for (let j = 0; j < team.length; j++) {
            const name = team[j];
            html += `
                <div class="px-0 d-flex flex-column flex-sm-row">
                    ${staffIconHtml(name)} <p>${name}</p> 
                </div>
                `;
        }
        html += '</div>';
    } else { html = `<div>&nbsp;</div>` }
    return html;
}

/////////////////////////////////////////////////////////////////////////////////////////
// other function concerning modal in board and backlog


/**
 * shows task details on a modal
 * data is editable
 * @param {integer} i - index of task
 * @param {string} page - 'board', if task is shown on board
 */
function showCard(i, page) {
    let cardModal = new bootstrap.Modal(getId('cardModal'), {});
    cardModal.show();

    if (page == 'board') { // if modal is called from board, data from allTasks is rendered
        currentTask = JSON.parse(JSON.stringify(allTasks[i])); //copy json
    } else {// if modal is called from backlog, data from backlogTasks is rendered
        currentTask = JSON.parse(JSON.stringify(backlogTasks[i])); //copy json
    }

    renderCardData(i, page);

    getId('changeStatusButtons').innerHTML = changeStatusButtons(i, page);
    getId('footer-buttons').innerHTML = footerButtons(i, page);
}


/**
 * renders task details on modal
 * @param {integer} i - index of task
 * @param {string} page - 'board', if task is shown on board
 */
function renderCardData(i, page) {
    getId('card-title').innerHTML = currentTask.title;
    getId('card-description').innerHTML = currentTask.description;
    getId('card-date').value = currentTask.dueDate;
    renderCategories();
    renderImportance(i);

    // getId('card-category').onchange = function () { changeCategory(i, page) };
    showAssignedUsers();
}

// function renderImportance() {
//     return `<label for="importance" class="form-label">IMPORTANCE*</label>
//     <select class="form-select" id="importance" required>
//         <option value="" selected>Choose...</option>
//         <option value="high">High</option>
//         <option value="medium">Medium</option>
//         <option value="low">Low</option>
//     </select>`
// }

/**
 * creates buttons in modal 
 * button for send to board is only shown in backlog
 * @param {integer} i - index of task
 * @param {string} page - 'board', if task is shown on board
 * @returns html code
 */
function changeStatusButtons(i, page) {
    html = '';
    if (page == 'board') {
        html += `
        <img onclick="deleteTaskFromBoard(${i})" data-bs-dismiss="modal" class="trashbin" src="./img/delete.png" title="delete this card">
        `;
    } else {
        html += `
        <img src="./img/paperplane.png" data-bs-dismiss="modal" onclick="moveToBoard(${i})" class="plane-icon-in-modal plane-icon" title="move to board">
        <img onclick="deleteTask(${i})" data-bs-dismiss="modal" class="trashbin" src="./img/delete.png" title="delete this card">
        `;
    }
    return html;
}


/**
 * creates buttons in modal footer
 * buttons for previous/next task are only shown in backlog
 * @param {integer} i - index of task
 * @param {string} page - 'board', if task is shown on board
 * @returns html code
 */
function footerButtons(i, page) {
    html = '';
    if (page != 'board') {
        html += `
        <button onclick="previousCard(${i})" data-bs-dismiss="modal" class="btn btn-lg bg-ci-dark join-btn-color">
            previous task
        </button>`;
    }
    html += `
        <button onclick="saveChanges(${i}, '${page}')" data-bs-dismiss="modal" type="button" class="btn btn-outline-success">
             save changes
        </button>`;
    if (page != 'board') {
        html += `
        <button id="nextTask" onclick="nextCard(${i})" data-bs-dismiss="modal" class="btn btn-lg bg-ci-dark join-btn-color">
            next task
        </button>`;
    }
    return html;
}


/**
 * saves all details of the task in the modal
 * @param {integer} i - index of task
 * @param {string} page - 'board', if task is shown on board
 */
function saveChanges(i, page) {
    let title = getId('card-title').textContent;
    let description = getId('card-description').textContent;
    let date = getId('card-date').value;
    let categorySelector = getId('card-category');
    let importanceSelector = getId('importance');
    let selectedCategory = categorySelector[categorySelector.selectedIndex].value;
    let selectedImportance = importanceSelector[importanceSelector.selectedIndex].value;
    let indexToSave = findAllTaskIndex(i, page);

    if (assignedToIsFeasible(indexToSave, page)) {
        allTasks[indexToSave].title = title;
        allTasks[indexToSave].description = description;
        allTasks[indexToSave].dueDate = date;
        allTasks[indexToSave].assignedTo = currentTask.assignedTo;
        allTasks[indexToSave].category = selectedCategory;
        allTasks[indexToSave].importance = selectedImportance;

        save(allTasks, 'tasks');

        if (page == 'board') {
            renderBoardTasks();
        } else {
            renderTasksInBacklog();
        }
    }
    checkActiveTasks();
}


/**
 * 'translates' index of task in backlogTasks to index in allTasks
 * @param {integer} i - index of task
 * @param {string} page - 'board', if task is from board
 * @returns index of task in allTasks
 */

function findAllTaskIndex(i, page) {
    if (page == 'board') {
        return i;
    } else {//task from backlog
        let idToSave = backlogTasks[i].id;
        return allTasks.findIndex(task => task.id == idToSave);
    }
}


/**
 * true if the (changed) assignment in the modal doesn't increase the number of active tasks per person to a value above maxActiveTasksPerUser
 * only changes of tasks in status 'progress' or 'testing' are relevant (otherwise the number of active tasks is not affected)
 * shows an alert, if result is false
 * if the result is true, activeTasks are updated for all affected users
 * @param {integer} index - index of task on allTasks
 * @param {string} page - 'board' if task is shown on board
 * @returns boolean
 */
function assignedToIsFeasible(index, page) {
    let task = allTasks[index];
    if (page != 'board'
        || task.status == 'todo'
        || task.status == 'done'
        || task.assignedTo == currentTask.assignedTo) {//no changes or irrelevant changes
        return true;
    }
    let [namesWithChangedActiveTasks, changedActiveTasks] = calcActiveTasksForAssignChanges(index);
    if (Math.max(...changedActiveTasks) > maxActiveTasksPerUser) {
        alert(`This change of assigned users is not feasible. ${namesWithChangedActiveTasks[changedActiveTasks.indexOf(maxActiveTasksPerUser + 1)]} is already assigned to ${maxActiveTasksPerUser} active tasks. Your changes will not be saved.`);
        return false;
    } else {
        updateActiveTasksForAssignChanges(namesWithChangedActiveTasks, changedActiveTasks);
        return true;
    }
}


/**
 * is called by function assignedToIsFeasible(index, page) only if the changes of assignedTo are feasible
 * updates the values of activeTasks for all affected users
 * @param {array} names 
 * @param {array} changedActiveTasks 
 */
function updateActiveTasksForAssignChanges(names, changedActiveTasks) {
    for (let i = 0; i < names.length; i++) {
        users[names[i]].activeTasks = changedActiveTasks[i];
    }
}


/**
 * calculates the changes in number of active Tasks for changed assigned users
 * @param {integer} index - index of task in allTasks
 * @returns changedActiveTasks - array of jsons {'name':name, activeTasks: active Tasks after change}
 */
function calcActiveTasksForAssignChanges(index) {
    let task = allTasks[index];
    let namesWithChangedActiveTasks = [];
    let changedActiveTasks = [];

    for (let i = 0; i < task.assignedTo.length; i++) {
        const name = task.assignedTo[i];
        if (!currentTask.assignedTo.includes(name)) {
            //name is not assigned any more => decrease activeTasks
            namesWithChangedActiveTasks.push(name);
            changedActiveTasks.push(users[name].activeTasks - 1);
        }
    }
    for (let j = 0; j < currentTask.assignedTo.length; j++) {
        const name = currentTask.assignedTo[j];
        if (!task.assignedTo.includes(name)) {
            //name is a new assignee => increase activeTasks
            namesWithChangedActiveTasks.push(name);
            changedActiveTasks.push(users[name].activeTasks + 1);
        }
    }
    return [namesWithChangedActiveTasks, changedActiveTasks];
}


/**
 * renders the option fields of category-selector and displays the chosen one
 */
function renderCategories() {
    let category = document.getElementById('card-category');
    category.innerHTML = '';

    for (j = 0; j < categories.length; j++) {
        if (currentTask.category == categories[j]) {
            category.innerHTML += `<option selected>${categories[j]}</option>`;
        } else {
            category.innerHTML += `<option>${categories[j]}</option>`;
        }
    }
}

function renderImportance(i) {
    let importance = document.getElementById('importance');
    importance.innerHTML = "";

    if (currentTask.importance == "high") {
        importance.innerHTML =
        `
        <option selected>High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
        `
    } else if (currentTask.importance == "medium") {
        importance.innerHTML =
        `
        <option selected>Medium</option>
        <option value="high">High</option>
        <option value="low">Low</option>
        `
    } else if (currentTask.importance == "low") {
        importance.innerHTML =
        `
        <option selected>Low</option>
        <option value="High">High</option>
        <option value="medium">Medium</option>
        `
    }
}

/////////////////////////////////////////////////////////////////////////////////////////

/**
 * renders html code for restore and delete buttons in trash and archive
 * @param {integer} i - index of the task 
 * @returns html code 
 */
function trashButtons(i) {
    return `<div id="restore-btn" class="d-flex w-100 justify-content-end">
                <img type="button" onclick="event.stopPropagation();restoreTask(${i})"
                class="trashbin p-2" src="./img/reuse.png" >

                <img type="button" onclick="event.stopPropagation();deleteTask(${i})"
                class="trashbin p-2" src="./img/delete.png" alt="delete irrevocably" title="delete irrevocably">
            </div>
            `;
}

function checkActiveTasks() {
    for (const name in users) {
        console.log(users[name].name + ': ' + users[name].activeTasks);
    }
}

function showAssignedUsers() {
    let assignedTo = getId('card-assigned-to');
    assignedTo.innerHTML = '';
    for (let i = 0; i < currentTask.assignedTo.length; i++) {
        const name = currentTask.assignedTo[i];
        assignedTo.innerHTML += userIconNameMail(name);;
    }
    if (moreStaffAllowed()) {
        assignedTo.innerHTML += addUserHtml();
        fillAssignedToList();
    }
}

/**
 * creates html code to show the icon, name and email address of a user
 * @param {string} name - name of (assigned) user
 * @returns html code
 */
function userIconNameMail(name, clickable = true) {
    return `<div class="userContent">
                ${staffIconHtml(name, clickable)}
                <div class="userAndMail">
                    <p>${users[name].name}</p>
                    <p><a href="mailto:${users[name].email}"}>${users[name].email}</a></p>
                </div>
            </div>`;
}