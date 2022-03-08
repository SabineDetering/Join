
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
                `<div data-bs-toggle="modal" onclick="showCard(${i})" href="#exampleModalToggle0" class="card">
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

    // let indexOfNextCard = i + 1;
    backlogTasks = allTasks[i];

    let contentOfCard = getId('card-content');

    contentOfCard.innerHTML = 
    `<div class="modal fade" id="exampleModalToggle0" aria-hidden="true" aria-labelledby="exampleModalToggleLabel"
    tabindex="-1">
    <div id="myModal" class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
        
          <h5 class="modal-title" id="exampleModalToggleLabel0">Modal 1</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        ${backlogTasks.title}
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" data-bs-target="#exampleModalToggle1" data-bs-toggle="modal">next
            Task</button>
        </div>
      </div>
    </div>
  </div>
`;
}

