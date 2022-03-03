function addTask(status) {
    let currentTask = getTaskData();
    currentTask.id = allTasks.length + 1;
    currentTask.status = status;
    allTasks.push(currentTask);
    save(allTasks);
}
function getTaskData() {
    let title = getId('title').value;
    let description = getId('description').value;
    let catSelector = getId('category');
    let category = catSelector[catSelector.selectedIndex].value;
    let dueDate = getId('due-date').value;
    let impSelector = getId('importance');
    let importance = impSelector[impSelector.selectedIndex].value;
    let assignSelector = getId('assigned-to');
    let assignedTo = [];
    assignedTo.push(assignSelector[assignSelector.selectedIndex].value);
    return { title, description, category, dueDate, importance, assignedTo}
}