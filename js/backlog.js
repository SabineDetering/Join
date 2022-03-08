
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
            `<div class="card">
                <div class="card-body cardInBacklog">
                    <div class="staff-icons-backlog">${getStaff(i)}</div>
                    <div>${backlogTasks.dueDate}</div>
                    <p>${backlogTasks.category}<p>
                    <p>${backlogTasks.description}<p>
                    <img onclick="deleteTask(${i})" class="trashbin" src="./img/delete.png">
                </div>
            </div>`;
        }
    }
}

function getStaff(i) {
    let stuff = allTasks[i].assignedTo;
    let html = '';

    for (let index = 0; index < stuff.length; index++) {
        const teamMember = stuff[index];
        if (teamMember) {
            html += `
        <span class="staff-icon bg-ci-dark p-1 icon-margin">${teamMember}</span>
        `;
        }
    }
    return html;
}

function deleteTask(i) {
    allTasks.splice(i, 1);
    save(allTasks, 'tasks');

    renderCards();
}

