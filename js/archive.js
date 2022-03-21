/**
 * loads data from server if function is called onload
 * calls render function
 * @param {boolean} onload - true, if the function is called onload
 */
async function renderArchive(onload = false) {
    if (onload) {
        await init();
    }
    let archive = getId('archive-content');
    archive.innerHTML = archiveHtml();
    try {//avoid error if trash is empty
        getId('restore-btn').alt = "restore to board";
        getId('restore-btn').title = "restore to board";
    } catch { }
    checkActiveTasks();
}


/**
 * creates html code for all tasks in archive or a short message if archive is empty
 * @returns html code 
 */
function archiveHtml() {
    html = '';
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        if (task.status == 'archive') {
            html += archiveCard(i);
        }
    }
    if (html) {
        return html;
    } else {
        getId('archive-header').classList.add('invisible');
        return "There are no archived tasks."
    }
}


/**
 * renders the information for one task in archive
 * @param {integer} i - index of the task
 * @returns html code 
 */
function archiveCard(i) {
    const task = allTasks[i];
    return `
    <div class="card archive-card px-2 pt-4 d-flex flex-column justify-content-between shadow">
        <div class="d-flex align-items-start flex-column flex-lg-row">
            <div class="fw-bold d-lg-none">Delete date</div>
            <div class="date">
                ${task.archiveDate}
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
 * final deletion of a task
 * @param {integer} i - index of task
 */
function deleteTask(i) {
    allTasks.splice(i, 1);
    save(allTasks, 'tasks');
    renderArchive();
}


/**
 * restores task to 'done' status
 * @param {integer} i - index of task
 */
function restoreTask(i) {
    let task = allTasks[i];
    task.status = 'done';
    task.archiveDate = '';
    save(allTasks, 'tasks');
    renderArchive();
}