/**
 * loads data from server if function is called onload
 * calls render function
 * @param {boolean} onload - true, if the function is called onload
 */
async function renderTrash(onload = false) {
    if (onload) {
        await init();
    }
    let trash = getId('trash-content');
    trash.innerHTML = trashHtml();
    getId('restore-btn').alt = "restore to backlog resp. todo";
    getId('restore-btn').title = "restore to backlog resp. todo";
}


/**
 * creates html code for all tasks in trash or a short message if trash is empty
 * @returns html code 
 */
function trashHtml() {
    html = '';
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        if (task.status == 'trash') {
            html += trashCard(i);
        }
    }
    if (html) {
        return html;
    } else {
        getId('trash-header').classList.add('invisible');
        return "There are no deleted tasks."
    }
}


/**
 * renders the information for one task in trash
 * @param {integer} i - index of the task
 * @returns html code 
 */
function trashCard(i) {
    const task = allTasks[i];
    return `
    <div class="card trash-card px-2 pt-4 d-flex flex-column justify-content-between shadow">
        <div class="d-flex align-items-start flex-column flex-lg-row">
            <div class="fw-bold d-lg-none">Delete date</div>
            <div class="date">
                ${task.deleteDate}
            </div>
            <div class="fw-bold d-lg-none mt-1">Deleted from</div>
            <div  class="status text-capitalize">
                ${task.deletedFrom}
            </div>
            <div class="fw-bold d-lg-none  mt-1">Category</div>
            <div class="category text-capitalize">
                ${task.category}
            </div>
            <div class="fw-bold d-lg-none mt-1">Title</div>
            <div class="title">
                ${task.title}
            </div>            
            <div class="fw-bold d-lg-none mt-1">Description</div>
            <div class="description d-inline-block">
                ${task.description.slice(0, 97) + '...'}
            </div>            
            <div class="fw-bold d-lg-none  mt-1">Assigned to</div>
            <div class="assignedTo d-flex flex-column align-items-start ">
                ${getTeam(i)}
            </div>
        </div>
        ${trashButtons(i)}
    </div>
    `;
}


/**
 * final deletion of task
 * @param {integer} i - index of task
 */
function deleteTask(i) {
    allTasks.splice(i, 1);
    save(allTasks, 'tasks');
    renderTrash();
}


/**
 * restores task either to board with status todo or to backlog
 * @param {integer} i - index of task
 */
function restoreTask(i) {
    let task = allTasks[i];
    if (task.deletedFrom == 'backlog') {
        task.status = 'backlog';
    } else {
        task.status = 'todo';
    }

    task.deletedFrom = '';
    task.deleteDate = '';
    save(allTasks, 'tasks');
    renderTrash();
}