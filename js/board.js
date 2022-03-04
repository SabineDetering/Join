
// async function getBoardTasks(){
//     let response = await fetch(allTasks)
//     let jsonTask = await response.json();
//     renderCompleteTask()


// }

async function renderCompleteTasks() {
    await init();
    let todo = getId('todo');
    let progress = getId('progress');
    let testing = getId('testing');
    let done = getId('done');
    todo.innerHTML = ``;
    progress.innerHTML = ``;
    testing.innerHTML = ``;
    done.innerHTML = ``;
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


function taskCard(i) {
    let html = `    
    <div id="task${i}" class="card p-2">
    <h6>${allTasks[i].title}</h6>
    </div>`;
    return html;

}