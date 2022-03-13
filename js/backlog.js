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
            `<div onclick="showCard(${i})" class="card shadow">
                <div class="card-body cardInBacklog">
                    <div class="staff-container">${getStaff(i)}</div>
                    <div class="date">${task.dueDate}</div>
                    <p class="category">${task.category}<p>
                    <p class="title">${task.title}<p>
                    <img onclick="event.stopPropagation();deleteTask(${i})" class="trashbin p-2" src="./img/delete.png">
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

function showCard(i) {
    let cardModal = new bootstrap.Modal(getId('cardModal'), {});
    cardModal.show();
    let task = backlogTasks[i];
    let contentOfCard = getId('modal-content');
    currentTask = backlogTasks[i];

    contentOfCard.innerHTML = `
    <div class="modal-header">
    <h5 class="modal-title" id="title">
    <span id="backlog-title" class="textarea-backlog form-control" role="textbox" contenteditable>${task.title}</span>
    </h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div id="description" class="modal-body">
    <h6><b>Description:</b></h6>
    <span id="backlog-description" class="textarea-backlog-description form-control" role="textbox" contenteditable>${task.description}</span></p>
    <div class="infosOfCard">
    <div class="dateAndCategory">
    <div><h6><b>due Date:</b></h6><input id="backlog-date" value="${task.dueDate}" type="date" class="backlog-date form-control mb-3" required aria-describedby="due-date-button" id="due-date"></div>
    <div><h6><b>category:</b></h6>
    <select onchange="changeCategory(${i})" id="category-backlog" class="form-select" aria-label="Default select example">
    </select></div>
    </div>
    <h6><b>assigned to:</b></h6>
    <div id="assigned-to-backlog" class="personInCard" style="display: flex"></div>
    
    </div>
    </div>
    <div class="div-of-moveToBoard-btn"><button onclick="moveToBoard(${i})" type="button" class="moveToBoard-btn btn btn-primary btn-sm">move card to board</button></div>
    <div id="button" class="modal-footer">
    <button onclick="previousCard(${i})" class="btn btn-primary">previous task</button>
    <button onclick="saveChanges(${i})" type="button" class="btn btn-outline-success">save changes</button>
    <button id="nextTask" onclick="nextCard(${i})" class="btn btn-primary">next task</button>
    </div>`;

    showAssignedUsers();
    renderCategories(i);
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

function saveChanges(i) {
    let title = getId('backlog-title').textContent;
    let description = getId('backlog-description').textContent;
    let date = getId('backlog-date').value;

    let idToSave = backlogTasks[i].id;
    let indexToSave = allTasks.findIndex(task => task.id == idToSave);

    allTasks[indexToSave].title = title;
    allTasks[indexToSave].description = description;
    allTasks[indexToSave].dueDate = date;
    allTasks[indexToSave].assignedTo = currentTask.assignedTo;
    allTasks[indexToSave].category = backlogTasks[i].category;

    save(allTasks, 'tasks');
    renderTasksInBacklog();
}

function moveToBoard(i) {
    allTasks[i].status == 'todo';

    renderTasksInBacklog();
    save(allTasks, 'tasks');
}

function renderCategories(i) {

    let category = document.getElementById('category-backlog');
    category.innerHTML = '';

    for (j = 0; j < categories.length; j++) {
        if (backlogTasks[i].category == categories[j]) {
            category.innerHTML += `<option selected>${categories[j]}</option>`;
        } else {
            category.innerHTML += `<option>${categories[j]}</option>`;
        }

    }
}

function changeCategory(i) {
    let categorySelector = getId('category-backlog');

    categorySelector[categorySelector.selectedIndex].value;

    backlogTasks[i].category = categorySelector[categorySelector.selectedIndex].value;
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