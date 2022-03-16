let backlogTasks = [];

async function renderTasksInBacklog(onload = false) {
    if (onload) {
        await init();
    }
    backlogTasks = allTasks.filter(task => task.status == 'backlog');
    renderCards();
}

function renderCards() {
    let backlogContent = document.getElementById('card-body');
    backlogContent.innerHTML = "";
    for (let i = 0; i < backlogTasks.length; i++) {

        let task = backlogTasks[i];

        backlogContent.innerHTML +=
            `<div id="card${i}" onclick="showCard(${i})" class="card shadow bd-imp-${task.importance}">
                <div class="card-body cardInBacklog mb-4">
                    <div class="staff-container">${getStaff(i)}</div>
                    <div class="date">${task.dueDate}</div>
                    <p class="category">${task.category}<p>
                    <p class="title">${task.title}<p>
                    <div class="importance" id="importance${i}"><div>
                </div>
                <div class="iconsInCards">
                        <img src="./img/paperplane.png" onclick="event.stopPropagation();moveToBoard(${i})" class="plane-icon" title="move to board">
                        <img onclick="event.stopPropagation();deleteTask(${i})" title="delete this card" class="trashbin" src="./img/delete.png">
                    </div>
            </div>`;
    }
}

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
        html += `<div class="assignTask">
    <img class="plus-icon" src="./img/icon plus.png">
    <p>Click card to assign task!</p></div>` }
    return html;
}


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
 * shows task details on a modal
 * data is editable
 * @param {integer} i - index of task
 * @param {string} page - 'board', if task is shown on board
 */
function showCard(i, page) {
    let cardModal = new bootstrap.Modal(getId('cardModal'), {});
    cardModal.show();

    if (page == 'board') { // if modal is called from board, data from allTasks is rendered
        currentTask = allTasks[i];
    } else {// if modal is called from backlog, data from backlogTasks is rendered
        currentTask = backlogTasks[i];
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
    getId('card-category').onchange = function () { changeCategory(i, page) };
    showAssignedUsers();
}

/**
 * creates buttons in modal 
 * buttons for send to board is only shown in backlog
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
        <button onclick="previousCard(${i})" data-bs-dismiss="modal" class="btn btn-primary">
            previous task
        </button>`;
    }
    html += `
        <button onclick="saveChanges(${i}, '${page}')" data-bs-dismiss="modal" type="button" class="btn btn-outline-success">
             save changes
        </button>`;
    if (page != 'board') {
        html += `
        <button id="nextTask" onclick="nextCard(${i})" data-bs-dismiss="modal" class="btn btn-primary">
            next task
        </button>`;
    }
    return html;
}


function previousCard(i) {
    if (i == 0) {
        document.getElementById('nextTask').classList.add('background-color-grey');
        alert('this is the first task');
    } else {
        i--;
    }
    showCard(i);
}

function nextCard(i) {
    if (i == backlogTasks.length - 1) {
        alert('no more tasks available')
        document.getElementById('nextTask').classList.add('background-color-grey');
    } else {
        i++;
    }
    showCard(i);
}

function saveChanges(i, board) {
    let title = getId('card-title').textContent;
    let description = getId('card-description').textContent;
    let date = getId('card-date').value;
    let idToSave;
    let indexToSave;

    if (board == 'board') {
        indexToSave = i;
    } else {
        idToSave = backlogTasks[i].id;
        indexToSave = allTasks.findIndex(task => task.id == idToSave);
    }

    allTasks[indexToSave].title = title;
    allTasks[indexToSave].description = description;
    allTasks[indexToSave].dueDate = date;
    allTasks[indexToSave].assignedTo = currentTask.assignedTo;
    allTasks[indexToSave].category = currentTask.category;

    save(allTasks, 'tasks');

    if (board == 'board') {
        renderBoardTasks();
    } else {
        renderTasksInBacklog();
    }
}


function moveToBoard(i) {
    backlogTasks[i].status = 'todo';
    save(allTasks, 'tasks');
    renderTasksInBacklog();
}


// renders the option fields of category-selector and displays the chosen one
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


function changeCategory(i, board) {
    let categorySelector = getId('card-category');

    let selectedCategory = categorySelector[categorySelector.selectedIndex].value;

    if (board == 'board') {
        allTasks[i].category = selectedCategory;
    } else {
        backlogTasks[i].category = selectedCategory;
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
function userIconNameMail(name,clickable=true) {
    return `<div class="userContent">
                ${staffIconHtml(name, clickable)}
                <div class="userAndMail">
                    <p>${users[name].name}</p>
                    <p><a href="mailto:${ users[name].email}"}>${users[name].email}</a></p>
                </div>
            </div>`;
}