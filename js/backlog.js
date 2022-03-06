
async function renderTasksInBacklog() {

    // const teamMember = stuff[index];

    await init();
    let backlogContent = document.getElementById('card-body');
    // // backlogContent.innerHTML = '';

    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].status == 'backlog') {

            let backlogTasks = allTasks[i];

            backlogContent.innerHTML += `<div class="card">
            <div class="card-body cardInBacklog">
            ${getStaff(i)}
            ${backlogTasks.title}</div>
            </div>`;
        }
    }
}

// function getStaff(i) {
//     let stuff = allTasks[i].assignedTo;
//     let html = '';

//     for (let j=0; j < stuff.length; j++) {
//     html += `<div id='stuff-icons' class="text-end">
//     <span class="stuff-icon bg-ci-dark p-1">${stuff[j]}</span>
//     </div>`;
//     }
//     return html;
// }

function getStaff(i) {
    let stuff = allTasks[i].assignedTo;
    let html = '';

    for (let index = 0; index < stuff.length; index++) {
        const teamMember = stuff[index];
        if (teamMember) {
            html += `
        <span class="stuff-icon bg-ci-dark p-1">${teamMember}</span>
        `;
        }
    }
    return html;
}
