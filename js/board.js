
async function getBoardTasks(){
    let response = await fetch(allTasks)
    // let jsonTask = await response.json();
    renderCompleteTask(response)


}

function renderCompleteTask(response) {

    for (let i = 0; i < response.length; i++) {
        const task = response[i];

        getId('task').innerHTML +=`
        <span id="title${i}">${task['title']}</span>
        <span id="description${i}">${task['description']}</span>
        <span id="category${i}">${task['category']}</span>
        <span id="date${i}">${task['dueDate']}</span>
        <span id="importance${i}">${task['importance']}</span>
        <span id="assigned${i}">${task['assignedTo']}</span>
        <span id="status${i}">${task['status']}</span>
        `;
    }
}