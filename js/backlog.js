let backlogTasks = [];

async function renderTasksInBacklog() {
    await init();
    backlogTasks = allTasks.filter(task => task.status == 'backlog');
    renderCards();
}

function renderCards() {
    let backlogContent = document.getElementById('card-body');
    backlogContent.innerHTML = "";
    for (let i = 0; i < backlogTasks.length; i++) {

        let task = backlogTasks[i];

        backlogContent.innerHTML +=
            `<div data-bs-toggle="modal" href="#exampleModalToggle1" onclick="showCard(${i})" class="card">
                <div class="card-body cardInBacklog">
                    <div class="staff-container">${getStaff(i)}</div>
                    <div class="date">${task.dueDate}</div>
                    <p class="category">${task.category}<p>
                    <p class="title">${task.title}<p>
                    <img onclick="deleteTask(${i})" class="trashbin" src="./img/delete.png">
                </div>
            </div>`;
    }
}

function getStaff(i) {
    let staff = backlogTasks[i].assignedTo;
    let html = '';

    for (let index = 0; index < staff.length; index++) {
        const teamMember = staff[index];
        if (teamMember) {
            html +=
                `
            <div class="staff-icons-backlog">
            <span class="staff-icon bg-ci-dark p-1 icon-margin"><img src="${users[staff[index]].img}"></span>
            </div>
            <div class="userAndMail">
            <span>${teamMember}</span>
            <span>${users[staff[index]].email}</span>
            </div>`;
        }
    }
    return html;
}

function deleteTask(i) {
    allTasks.splice(i, 1);
    save(allTasks, 'tasks');

    renderCards();
}

function showCard(i) {

    let task = backlogTasks[i];
    let contentOfCard = getId('modal-content');

    contentOfCard.innerHTML = `
    <div class="modal-header">
    <h5 class="modal-title" id="title">
    <input type="text" class="form-control" value="${task.title}">
    </h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div id="description" class="modal-body">
    <h6><b>Description:</b></h6><textarea class="form-control">${task.description}</textarea>
    <div class="infosOfCard">
    <div><h6><b>due Date:</b></h6><input value="${task.dueDate}" type="date" class="form-control mb-3" required aria-describedby="due-date-button"
    id="due-date"></div>
    <h6><b>assignet to:  
    
    <div id="assigned-to-backlog">
    <div class="btn-group dropend">
        <img onclick="emptyForm()" id="plus-icon-backlog" type="button" class="dropdown-toggle" data-bs-toggle="dropdown"
            aria-expanded="false" src="img/icon plus.png" alt="add team member"
            title="add team member">

        <ul id="assigned-to-list-backlog" class="dropdown-menu p-3">
        </ul>
    </div>
    </div>

</b></h6><div style="display: flex">${getStaff(i)}</div>
    </div>
    </div>
    <div id="button" class="modal-footer">
    <button onclick="nextCard(${i})" class="btn btn-primary">next Task</button>
    </div>`;

}

function nextCard(i) {
    if (i == backlogTasks.length -1) {
        i = 0
    } else {
        i++;
    }
    showCard(i);
}


function emptyForm() {
    let assignedToBacklog = getId('assigned-to-backlog');
    assignedToBacklog.innerHTML = addUserHtml();
    fillAssignedToListBacklog();
}


function addUserHtml() {
    return `<div class="btn-group dropend">
                <img id="plus-icon-backlog" type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" src="img/icon plus.png" alt="add team member" title="add team member">

                <ul id="assigned-to-list-backlog" class="dropdown-menu p-2">
                </ul>
            </div>`
}

function fillAssignedToListBacklog() {
    let list = getId('assigned-to-list-backlog');
    list.innerHTML = '';
    for (const name in users) {
            list.innerHTML += itemMaker(users[name].name);
        }
    }

    function assignUser(name) {
        currentTask.assignedTo.push(name);
        showAssignedUsers();
    }

    function showAssignedUsers() {
        let assignedTo = getId('assigned-to-backlog');
        assignedTo.innerHTML = '';
        for (let i = 0; i < currentTask.assignedTo.length; i++) {
            const name = currentTask.assignedTo[i];
            assignedTo.innerHTML += staffIconHtml(name);
        }

        if (moreStaffAllowed()) {
            assignedTo.innerHTML += addUserHtml();
            fillAssignedToList();
        }
    }