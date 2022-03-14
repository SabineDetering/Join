let currentDraggedElement;


/**
 * loads data from server if function is called onload
 * renders all tasks that belong to the board according to their status
 */
async function renderBoardTasks(onload = false) {
    if (onload) {
        await init();
    }
    let statusList = ['todo', 'progress', 'testing', 'done'];
    for (let j = 0; j < statusList.length; j++) {
        const status = statusList[j];
        let statusElement = getId(status);
        statusElement.innerHTML = '';
        for (let i = 0; i < allTasks.length; i++) {
            const task = allTasks[i];
            if (task.status == status) {
                statusElement.innerHTML += taskCard(i);
            }
        }
    }
}


/**
 * creates html code for rendering the task card
 * @param {integer} i - index of the task
 * @returns html code 
 */
function taskCard(i) {
    return `    
    <div id="task${i}" draggable="true" ondragstart="startDragging(${i})" class="card task shadow p-2 mb-1" onclick="showCard(${i})">
        <h6>${allTasks[i].title}</h6>

        <div class="d-flex justify-content-between">
            <div id='staff-icons' class="d-flex" >
                ${staffIcons(i)}
            </div>
            <div>
                ${archiveButton(i)}
                <img onclick="event.stopPropagation();deleteTask(${i})" class="trashbin p-1" src="./img/delete.png">
            </div>
        </div>
    </div>
    `;
}


/**
 * creates html code for the icons of assigned staff
 * @param {integer} i - index of the task
 * @returns html code 
 */
function staffIcons(i) {
    let staff = allTasks[i].assignedTo;
    let html = '';

    for (let index = 0; index < staff.length; index++) {
        const teamMember = staff[index];
        if (teamMember) {
            html += staffIconHtml(teamMember, false);
        }
    }
    return html;
}


/**
 * creates html code for archive button only for tasks with status 'done'
 * @param {integer} i - index of task
 * @returns html code
 */
function archiveButton(i) {
    if (allTasks[i].status == 'done') {
        return ` <img onclick="event.stopPropagation();archiveTask(${i})" class="trashbin p-1" src="./img/archive.png"></img>`;
    } else {
        return '';
    }
}


function startDragging(index) {
    currentDraggedElement = index;
}


function allowDrop(ev) {
    ev.preventDefault();
}


async function moveTo(status, event) {
    event.preventDefault();
    if (moveFeasible(status)) {
        allTasks[currentDraggedElement].status = status;
        await save(allTasks, 'tasks');
        await save(users, 'users');
        renderBoardTasks();
    }
}

function moveFeasible(status) {
    let task = allTasks[currentDraggedElement];
    let calculatedActiveTasks = [];
    if (!task.assignedTo == []) {
        let statusBefore = task.status;
        for (let i = 0; i < task.assignedTo.length; i++) {
            const name = task.assignedTo[i];
            calculatedActiveTasks[i] = users[name].activeTasks;
            if (statusBefore == 'progress' || statusBefore == 'testing') {
                calculatedActiveTasks[i]--;
            } 
            if (status == 'progress' || status == 'testing') {
                calculatedActiveTasks[i]++;
            }
        }
        if (Math.max(...calculatedActiveTasks) > maxActiveTasksPerUser) {
            alert(`${task.assignedTo[calculatedActiveTasks.indexOf(3)]} is already assigned to 2 active tasks!`);
            return false;
        } else {
            for (let i = 0; i < task.assignedTo.length; i++) {
                const name = task.assignedTo[i];
                users[name].activeTasks = calculatedActiveTasks[i];
            }
            return true;
        }
    }
}


/**
 * changes task status to trash
 * saves date of deletion and status before deletion
 * updates board
 * @param {integer} i - index of task 
 */
function deleteTask(i) {
    allTasks[i].deletedFrom = allTasks[i].status;
    allTasks[i].status = "trash";
    allTasks[i].deleteDate = today;
    save(allTasks, 'tasks');

    renderBoardTasks();
}


/**
 * changes task status to archive
 * saves date of archiving
 * updates board
 * @param {integer} i - index of task 
 */
function archiveTask(i) {
    allTasks[i].status = 'archive';
    allTasks[i].archiveDate = today;
    save(allTasks, 'tasks');

    renderBoardTasks();
}
