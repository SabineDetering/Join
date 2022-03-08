
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
                `<div class="card onclick="openCard(${i})">
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

// function openCard(i) {
//     data-bs-toggle="modal"
// }
