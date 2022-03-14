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
            `<div id="card${i}" onclick="showCard(${i})" class="card shadow">
                <div class="card-body cardInBacklog">
                <div class="iconsInCards">
                    <img src="./img/paperplane.png" onclick="event.stopPropagation();moveToBoard(${i})" class="plane-icon" title="move to board">
                    <img onclick="event.stopPropagation();deleteTask(${i})" class="trashbin p-2" src="./img/delete.png">
                </div>
                    <div class="staff-container">${getStaff(i)}</div>
                    <div class="date">${task.dueDate}</div>
                    <p class="category">${task.category}<p>
                    <p class="title">${task.title}<p>
                    <div class="importance" id="importance${i}"><div>
                </div>
            </div>`;
        checkImportance(i);
    }
}

// 
function checkImportance(i) {
    let chosenImportance = backlogTasks[i].importance;
    let containerColor = getId(`card${i}`);

    if (chosenImportance == 'low') {
        containerColor.style = "border-left: 20px solid #036603e6";
    } else if (chosenImportance == 'medium') {
        containerColor.style = "border-left: 20px solid #e5cf08";
    } else {
        containerColor.style = "border-left: 20px solid #9b2020";
    }
}

function getStaff(i) {
    let staff = backlogTasks[i].assignedTo;
    let html = '';

    if (staff.length > 0) {
        for (let index = 0; index < staff.length; index++) {
            const teamMember = staff[index];

            html +=
                `<div class="userContent">
                ${staffIconHtml(teamMember, false)}
                <div class="userAndMail">
                <p>${users[teamMember].name}<p>
                <p>${users[teamMember].email}<p>
                </div>
                </div>`;
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

// renders the content of Modal which opens when card gets clicked
function showCard(i, board) {
    let cardModal = new bootstrap.Modal(getId('cardModal'), {});
    cardModal.show();
    let task;

    if (board == 'board') { // if the modal is rendered from board, it fills content of allTasks Array
        task = allTasks[i];
        currentTask = allTasks[i];
    } else {
        task = backlogTasks[i];
        currentTask = backlogTasks[i];
    }


    getId('backlog-title').innerHTML = task.title;
    getId('backlog-description').innerHTML = task.description;
    getId('backlog-date').value = task.dueDate;

    getId('selectCategory').innerHTML =
        `<h6><b>CATEGORY:</b></h6>
    <select onchange="changeCategory(${i}, ${board})" id="category-backlog" class="form-select" aria-label="Default select example"></select>`;

    getId('containerOfBacklogButtons').innerHTML =
        `<div class="moveToBoardContainer">
        <img onclick="deleteTask(${i})" class="trashbin p-2" src="./img/delete.png" title="delete this card">
        <img src="./img/paperplane.png" onclick="moveToBoard(${i})" class="plane-icon-in-modal plane-icon" title="move to board">
    </div>
    <div id="button" class="modal-footer">
        <button onclick="previousCard(${i})" class="btn btn-primary">previous task</button>
        <button onclick="saveChanges(${i}, ${board})" type="button" class="btn btn-outline-success">save changes</button>
        <button id="nextTask" onclick="nextCard(${i})" class="btn btn-primary">next task</button>
    </div>`;

    showAssignedUsers();
    renderCategories(i, board);
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
    let title = getId('backlog-title').textContent;
    let description = getId('backlog-description').textContent;
    let date = getId('backlog-date').value;
    let idToSave;
    let indexToSave;

    if(board == 'board') {
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
    renderTasksInBacklog();
}

function moveToBoard(i) {
    backlogTasks[i].status = 'todo';
    save(allTasks, 'tasks');
    renderTasksInBacklog();
}

// renders the option fields of category-selector and displays the chosen one
function renderCategories(i, board) {

    let category = document.getElementById('category-backlog');
    category.innerHTML = '';
    let tasks;

    if (board == 'board') { // if board is chosesn, function renders categories of allTasks
        tasks = allTasks[i];
    } else {
        tasks = backlogTasks[i];
    }

    for (j = 0; j < categories.length; j++) {
        if (tasks.category == categories[j]) {
            category.innerHTML += `<option selected>${categories[j]}</option>`;
        } else {
            category.innerHTML += `<option>${categories[j]}</option>`;
        }
    }
}

function changeCategory(i, board) {
    let categorySelector = getId('category-backlog');

    categorySelector[categorySelector.selectedIndex].value;
    
    if(board == 'board') {
    allTasks[i].category = categorySelector[categorySelector.selectedIndex].value; 
    } else {
    backlogTasks[i].category = categorySelector[categorySelector.selectedIndex].value;
    }

}


function showAssignedUsers() {

    let assignedTo = getId('assigned-to-backlog');
    assignedTo.innerHTML = '';
    for (let i = 0; i < currentTask.assignedTo.length; i++) {
        const name = currentTask.assignedTo[i];
        assignedTo.innerHTML +=
            `<div class="userContent">
        ${staffIconHtml(name)}
        <div class="userAndMail">
        <p>${users[name].name}</p>
        <p>${users[name].email}</p>
        </div> </div>`;

    }

    if (moreStaffAllowed()) {
        assignedTo.innerHTML += addUserHtml();
        fillAssignedToList();
    }
}