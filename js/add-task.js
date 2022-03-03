function addTask(status) {
    let currentTask = getTaskData();
    currentTask.id = allTasks.length + 1;
    allTasks.push(currentTask);
    save(allTasks);
}
function getTaskData() {
    let title = getId('title').value;
    let description = getId('description').value;
    let catSelector = getId('category');
    let category = catSelector[catSelector.selectedIndex].value;
    let dueDate = getId('due-date').value;//format "yyyy-mm-dd"
    let impSelector = getId('importance');
    let importance = impSelector[impSelector.selectedIndex].value;
    let assignSelector = getId('assigned-to');
    let assignedTo = [];
    assignedTo.push(assignSelector[assignSelector.selectedIndex].value);
    let status = 'backlog';
    let statusToDo = getId('statusToDo');
    if (statusToDo.checked) {
        status = 'todo';
    } 
    return { title, description, category, dueDate, importance, assignedTo,status}
}