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
                    <img onclick="event.stopPropagation();deleteTask(${i})" class="trashbin p-2" src="./img/delete.png">
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
                `<div class="personContent">
            <div class="staff-icons-backlog">
            <span class="staff-icon bg-ci-dark p-1 icon-margin"><img src="${users[staff[index]].img}"></span>
            </div>
            <div class="userAndMail">
            <span>${teamMember}</span>
            <span>${users[staff[index]].email}</span>
            </div></div>`;
        }
    }
    return html;
}

function deleteTask(i) {
    let idToDelete = backlogTasks[i].id;
    let indexToDelete = allTasks.findIndex(task => task.id == idToDelete);

    allTasks[indexToDelete].deletedFrom = allTasks[indexToDelete].status;
    allTasks[indexToDelete].status = "trash";
    save(allTasks, 'tasks');

    backlogTasks = allTasks.filter(task => task.status == 'backlog');
    renderCards();
}

function showCard(i) {

    let task = backlogTasks[i];
    let contentOfCard = getId('modal-content');

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
    <select onclick="renderCategories()" id="category-backlog" class="form-select" aria-label="Default select example">
    <option id="selectedCategory" selected>${task.category}</option>
    </select></div>
    </div>
    <h6><b>assignet to:  
    
    </b></h6><div class="personInCard" style="display: flex">${getStaff(i)}</div>
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

function renderCategories() {

    let category = document.getElementById('category-backlog');
    category.innerHTML = '';
    
    for(j=0; j < categories.length; j++) {
        category.innerHTML += `<option onchange="checkIfNewCategorySelected(${j})" value="${j}">${categories[j]}</option>`;
    }
}

function changeCategory(j) {
let selectedCategory = getId('selectedCategory');
// let clickedCategory = getId(`category${j}`).value;

selectedCategory.value = categories[3];


// var value=selectedCategory.options[selectedCategory.j].value;// get selected option value
// var text=selectedCategory.options[selectedCategory.j].text;
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