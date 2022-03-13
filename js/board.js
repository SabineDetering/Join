let currentDraggedElement;

/**
 * loads all tasks from server
 * renders all tasks that belong to the board according to their status
 */
async function renderBoardTasks(onload=false) {
    if (onload) {
        await init();
    }

    let todo = getId('todo');
    let progress = getId('progress');
    let testing = getId('testing');
    let done = getId('done');

    todo.innerHTML = '';
    progress.innerHTML = '';
    testing.innerHTML = '';
    done.innerHTML = '';

    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        if (task.status == 'todo') {
            todo.innerHTML += taskCard(i);
        } else if (task.status == 'progress') {
            progress.innerHTML += taskCard(i);
        } else if (task.status == 'testing') {
            testing.innerHTML += taskCard(i);
        } else if (task.status == 'done') {
            done.innerHTML += taskCard(i);
        }

    }
}

/**
 * 
 * @param {integer} i - index of the task
 * @returns html code for rendering the task card
 */
function taskCard(i) {
    return `    
    <div id="task${i}" draggable="true" ondragstart="startDragging(${i})" class="card task shadow p-2 mb-1" onclick="showTask(${i})">
        <h6>${allTasks[i].title}</h6>

        <div class="d-flex justify-content-between">
            <div id='staff-icons' >
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
 * 
 * @param {integer} i - index of the task
 * @returns html code for rendering the assigned team members
 */
function staffIcons(i) {
    let staff = allTasks[i].assignedTo;
    let html = '';

    for (let index = 0; index < staff.length; index++) {
        const teamMember = staff[index];
        if (teamMember) {
            html += staffIconHtml(teamMember);
        }
    }
    return html;
}

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
    allTasks[currentDraggedElement].status = status;
    await save(allTasks, 'tasks');
    renderBoardTasks(false);
}


function deleteTask(i) {
    allTasks[i].deletedFrom = allTasks[i].status;
    allTasks[i].status = "trash";
    allTasks[i].deleteDate = today;
    save(allTasks, 'tasks');

    renderBoardTasks();
}
function archiveTask(i) {
    allTasks[i].status = 'archive';
    allTasks[i].archiveDate = today;
    save(allTasks, 'tasks');

    renderBoardTasks();
}
