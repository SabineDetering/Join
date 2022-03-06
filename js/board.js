/**
 * loads all tasks from server
 * renders all tasks that belong to the board according to their status
 */
async function renderBoardTasks() {
    await init();

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

        // getId('task').innerHTML =`
        // <span id="title${i}">${task['title']}</span>
        // <span id="description${i}">${task['description']}</span>
        // <span id="category${i}">${task['category']}</span>
        // <span id="date${i}">${task['dueDate']}</span>
        // <span id="importance${i}">${task['importance']}</span>
        // <span id="assigned${i}">${task['assignedTo']}</span>
        // <span id="status${i}">${task['status']}</span>
        // `;
    }
}

/**
 * 
 * @param {integer} i id of the task
 * @returns html code for rendering the task card
 */
function taskCard(i) {
    let html = `    
    <div id="task${i}" draggable="true" class="card task p-2 mb-1" onclick="showTask(${i})">
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
            html += `
        <span class="staff-icon bg-ci-dark p-1">${teamMember}</span>
        `;
        }
    }
    return html;
}