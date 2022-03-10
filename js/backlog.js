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
    <textarea id="backlog-title" class="textarea-backlog form-control">${task.title}</textarea>
    </h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div id="description" class="modal-body">
    <h6><b>Description:</b></h6><textarea id="backlog-description" class="textarea-backlog-description form-control">${task.description}</textarea>
    <div class="infosOfCard">
    <div class="dateAndCategory">
    <div><h6><b>due Date:</b></h6><input id="backlog-date" value="${task.dueDate}" type="date" class="backlog-date form-control mb-3" required aria-describedby="due-date-button" id="due-date"></div>
    <div><h6><b>category:</b></h6>
    <select id="category-backlog" class="form-select" aria-label="Default select example">
    <option selected>${task.category}</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select></div>
    </div>
    <h6><b>assignet to:  
    
    </b></h6><div style="display: flex">${getStaff(i)}</div>
    </div>
    </div>
    <div class="div-of-moveToBoard-btn"><button onclick="moveToBoard(${i})" type="button" class="moveToBoard-btn btn btn-primary btn-sm">move card to board</button></div>
    <div id="button" class="modal-footer">
    <button onclick="previousCard(${i})" class="btn btn-primary">previous task</button>
    <button onclick="saveChanges(${i})" type="button" class="btn btn-outline-success">save changes</button>
    <button id="nextTask" onclick="nextCard(${i})" class="btn btn-primary">next task</button>
    </div>`;

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
    if (i == backlogTasks.length -1) {
        alert('no more tasks available')
        document.getElementById('nextTask').classList.add('background-color-grey');
    } else {
        i++;
    }
    showCard(i);
}

function saveChanges(i) {
let title = getId('backlog-title').value;
let description = getId('backlog-description').value;
let date = getId('backlog-date').value;

backlogTasks[i].title = title;
backlogTasks[i].description = description;
backlogTasks[i].dueDate = date;

save(allTasks, 'tasks');
renderCards();
}

function moveToBoard(i) {
allTasks[i].status == 'todo';

renderTasksInBacklog();
save(allTasks, 'tasks');
}



/* <div id="assigned-to-backlog">
<div class="btn-group dropend">
    <img onclick="emptyForm()" id="plus-icon-backlog" type="button" class="dropdown-toggle" data-bs-toggle="dropdown"
        aria-expanded="false" src="img/icon plus.png" alt="add team member"
        title="add team member">

    <ul id="assigned-to-list-backlog" class="dropdown-menu p-3">
    </ul>
</div>
</div> */


// function emptyForm() {
//     let assignedToBacklog = getId('assigned-to-backlog');
//     assignedToBacklog.innerHTML = addUserHtml();
//     fillAssignedToListBacklog();
// }


// function addUserHtml() {
//     return `<div class="btn-group dropend">
//                 <img id="plus-icon-backlog" type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" src="img/icon plus.png" alt="add team member" title="add team member">

//                 <ul id="assigned-to-list-backlog" class="dropdown-menu p-2">
//                 </ul>
//             </div>`
// }

// function fillAssignedToListBacklog() {
//     let list = getId('assigned-to-list-backlog');
//     list.innerHTML = '';
//     for (const name in users) {
//             list.innerHTML += itemMaker(users[name].name);
//         }
//     }

//     function assignUser(name) {
//         currentTask.assignedTo.push(name);
//         showAssignedUsers();
//     }

//     function showAssignedUsers() {
//         let assignedTo = getId('assigned-to-backlog');
//         assignedTo.innerHTML = '';
//         for (let i = 0; i < currentTask.assignedTo.length; i++) {
//             const name = currentTask.assignedTo[i];
//             assignedTo.innerHTML += staffIconHtml(name);
//         }

//         if (moreStaffAllowed()) {
//             assignedTo.innerHTML += addUserHtml();
//             fillAssignedToList();
//         }
//     }