let currentDraggedElement;

/**
 * loads all tasks from server
 * renders all tasks that belong to the board according to their status
 */
async function renderBoardTasks(onload) {
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
 * @param {integer} i id of the task
 * @returns html code for rendering the task card
 */
function taskCard(i) {
    let html = `    
    <div id="task${i}" draggable="true" ondragstart="startDragging(${allTasks[i]['id']})" class="card task p-2 mb-1" onclick="showTask(${allTasks[i]['id']})">
        <h6>${allTasks[i].title}</h6>

        <div id='staff-icons' class="text-end">
             ${staffIcons(i)}
        </div>
    </div>`;
    return html;
}
/**
 * 
 * @param {integer} i id of the task
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


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


async function moveTo(status, event) {
    event.preventDefault();
    let index = getIndexInAllTasks(currentDraggedElement);
    allTasks[index].status = status;
    await save(allTasks, 'tasks');
    renderBoardTasks(false);
}

function getIndexInAllTasks(id) {
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        if (task.id == id) {
            return i;
        }
    }
}
