
async function renderTasksInBacklog() {

    await init();
    renderCards();
}

function renderCards() {
    let backlogContent = document.getElementById('card-body');
    backlogContent.innerHTML = "";
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].status == 'backlog') {

            let backlogTasks = allTasks[i];

            backlogContent.innerHTML +=
                `<div data-bs-toggle="modal" href="#exampleModalToggle1" onclick="showCard(${i})" class="card">
                <div class="card-body cardInBacklog">
                    <div class="staff-container">${getStaff(i)}</div>
                    <div class="date">${backlogTasks.dueDate}</div>
                    <p class="category">${backlogTasks.category}<p>
                    <p class="title">${backlogTasks.title}<p>
                    <img onclick="deleteTask(${i})" class="trashbin" src="./img/delete.png">
                </div>
            </div>`;
        }
    }
}

function getStaff(i) {
    let staff = allTasks[i].assignedTo;
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

    backlogTasks = allTasks[i];
    contentOfCard = getId('modal-content');

    contentOfCard.innerHTML = `
    <div class="modal-header">
    <h5 class="modal-title" id="title">
    ${backlogTasks.title}
    </h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div id="description" class="modal-body">
    <h6><b>Description:</b></h6>${backlogTasks.description}
    <div class="infosOfCard">
    <div><h6><b>due Date:</b></h6>${backlogTasks.dueDate}</div>
    <h6><b>assignet to:</b></h6><div style="display: flex">${getStaff(i)}</div>
    </div>
    </div>
    <div id="button" class="modal-footer">
    <button onclick="nextCard(${i})" class="btn btn-primary">next Task</button>
    </div>`;

}

function nextCard(i) {
    if (i == allTasks.length) {
        i = 0
    } else {
        i++;
        showCard(i);
    }
}

