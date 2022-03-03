function addTask(status) {
    let currentTask = getTaskData();
    currentTask.status = status;
    allTasks.push(currentTask);
    save(allTasks);
}
function getTaskData() {
    
}