function addTaskToBacklog() {
    let currentTask = getTaskData();
    currentTask.status = "backlog";
}
function addTaskToToDo() {
    let currentTask = getTaskData();
    currentTask.status = "todo";
}