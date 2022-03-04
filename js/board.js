
// async function getBoardTasks(){
//     let response = await fetch(allTasks)
//     let jsonTask = await response.json();
//     renderCompleteTask()


// }

function renderCompleteTasks() {
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
        if(task.status == 'todo'){
            todo.innerHTML += taskCard(i);
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


function taskCard(i){
    let html = `    
    <div id="task${i}" class="card">
    <h5>${allTasks[i].title}</h5>
    </div>`; 
    return html;

}