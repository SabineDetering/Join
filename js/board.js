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
    <div id="task${i}" draggable="true" ondragstart="startDragging(${i})" class="card task shadow p-2 mb-1 bd-imp-${allTasks[i].importance}" onclick="showCard(${i}, 'board')">
        <h6>${allTasks[i].title}</h6>

        <div class="icons-responsive d-flex justify-content-between">
    
            <div id='staff-icons' class="d-flex" >
                ${staffIcons(i)}
            </div>
            <div>
                ${archiveButton(i)}
                <img onclick="event.stopPropagation();deleteTaskFromBoard(${i})" title="delete this card" class="trashbin trashbin-board" src="./img/delete.png">
                <img onclick="event.stopPropagation();moveStatus(${i})" title="move" class="trashbin trashbin-board" src="./img/swipe.png">
            </div>
            
        </div>
    </div>
    `;
}

function moveStatus(i) {
    if (allTasks[i]['status'] == 'todo') {
        allTasks[i]['status'] = 'progress'
    } else {
        if (allTasks[i]['status'] == 'progress') {
            allTasks[i]['status'] = 'testing'
        } else {
            if (allTasks[i]['status'] == 'testing') {
                allTasks[i]['status'] = 'done'
            } else {
                if (allTasks[i]['status'] == 'done') {
                    allTasks[i]['status'] = 'todo'
                }
            }
        }
    }
    save(allTasks, 'tasks');
    renderBoardTasks();
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
        return ` <img onclick="event.stopPropagation();archiveTask(${i})" title="archive this card" class="trashbin trashbin-board" src="./img/archive.png"></img>`;
    } else {
        return '';
    }
}


/**
 * saves index of moved task in currentDraggedElement
 * @param {integer} index - index of moved task
 */
function startDragging(index) {
    currentDraggedElement = index;
}


function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * moves the dragged task to status, it it is feasible
 * @param {string} status - status the task is moved to
 */
async function moveTo(status, event) {
    event.preventDefault();
    if (moveFeasible(status)) {
        allTasks[currentDraggedElement].status = status;
        await save(allTasks, 'tasks');
        await save(users, 'users');
        renderBoardTasks();
    }
}


/**
 * true, if moving the task doesn't exceed the allowed number of active tasks for any assigned person
 * @param {string} status - status the task is moved to
 * @returns boolean
 */
function moveFeasible(status) {
    let task = allTasks[currentDraggedElement];
    let calculatedActiveTasks = [];
    if (!task.assignedTo == []) {
        calculatedActiveTasks = calculateActiveTasks(status);
        if (Math.max(...calculatedActiveTasks) > maxActiveTasksPerUser) {
            alert(`${task.assignedTo[calculatedActiveTasks.indexOf(maxActiveTasksPerUser + 1)]} is already assigned to ${maxActiveTasksPerUser} active tasks!`);
            return false;
        } else {
            updateActiveTasks(calculatedActiveTasks);
            return true;
        }
    }
}


/**
 * calculates the resulting number of active tasks for assigned people in case the intended move of taks is done 
 * @param {string} status - status the task is moved to
 * @returns array with resulting number of active tasks for assigned persons
 */
function calculateActiveTasks(status) {
    let task = allTasks[currentDraggedElement];
    let statusBefore = task.status;
    let calculatedActiveTasks = [];
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
    return calculatedActiveTasks;
}


/**
 * updates users json with calculatedActiveTasks 
 * @param {array} calculatedActiveTasks 
 */
function updateActiveTasks(calculatedActiveTasks) {
    let task = allTasks[currentDraggedElement];
    for (let i = 0; i < task.assignedTo.length; i++) {
        const name = task.assignedTo[i];
        users[name].activeTasks = calculatedActiveTasks[i];
    }
}


/**
 * changes task status to trash
 * saves date of deletion and status before deletion
 * updates board
 * @param {integer} i - index of task 
 */
function deleteTaskFromBoard(i) {
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
