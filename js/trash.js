async function renderTrash(onload = false) {
    if (onload) {
        await init();
    }
    let trash = getId('trash-content');
    trash.innerHTML = trashHtml();
}


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
        return "There are no deleted tasks."
    }
}


function trashCard(i) {
    const task = allTasks[i];
    return `
    <div class="card trash-card px-3 pt-4 mb-3 shadow type="button">
        <div class=" d-flex align-items-center">
            <div class="date">
                ${task.deleteDate}
            </div>
            <div  class="status text-capitalize">
                ${task.deletedFrom}
            </div>
            <div class="category text-capitalize">
                ${task.category}
            </div>
            <div class="title">
                ${task.title}
            </div>
            <div class="description d-inline-block">
                ${task.description.slice(0, 97) + '...'}
            </div>
            <div class="assignedTo">
                ${getTeam(i)}
            </div>
        </div>
        <div class="d-flex w-100 justify-content-end">
            <img type="button" onclick="event.stopPropagation();restoreTask(${i})"
           class="trashbin p-2" src="./img/reuse.png"  alt="restore to last status" title="restore to last status">

            <img type="button" onclick="event.stopPropagation();deleteTask(${i})"
           class="trashbin p-2" src="./img/delete.png" alt="delete irrevocably" title="delete irrevocably">
        </div>
    </div>
    `;
}

function getTeam(i) {
    let team = allTasks[i].assignedTo;
    let html = '';
    if (team) {
        html += '<div>';
        for (let j = 0; j < team.length; j++) {
            const name = team[j];
            html += `<p>${name}</p>`;            
        }
        html += '</div>';
    }
    return html;
}

function deleteTask(i) {
    allTasks.splice(i, 1);
    save(allTasks, 'tasks');
    renderTrash();
}

function restoreTask(i) {
    allTasks[i].status = allTasks[i].deletedFrom;
    save(allTasks, 'tasks');
    renderTrash();
}


