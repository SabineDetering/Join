async function renderCompleteTask() {
    
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];

        getId('task').innerHTML =`
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