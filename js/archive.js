function renderTasksInArchive(onload = false) {
    if (onload) {
        await init();
    }
    let archiveContainer = getId('archive-container');
    archiveContainer.innerHTML = '';
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        if (task.status == 'archive') {
            archiveContainer.innerHTML += task;
        }
    }
}