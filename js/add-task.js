/**
 * gets actual data from form as json and pushes it into allTasks
 * unique id for every task
 * initiates saving allTasks
 */
function addTask() {
    let currentTask = getTaskData();
    currentTask.id = allTasks.length + 1;
    allTasks.push(currentTask);
    save(allTasks);
}
/**
 * reads all inputs in add-task form
 * @returns json with all data of the task
 */
function getTaskData() {
    let title = getId('title').value;
    let description = getId('description').value;
    let catSelector = getId('category');
    let category = catSelector[catSelector.selectedIndex].value;
    let dueDate = getId('due-date').value;//format "yyyy-mm-dd"
    let impSelector = getId('importance');
    let importance = impSelector[impSelector.selectedIndex].value;
    let assignSelector = getId('assigned-to');
    //get array with all selected options
    let selectedAssignOptions = Array.from(assignSelector.selectedOptions);
    // get values of selected options 
    let assignedTo = selectedAssignOptions.map(option => option.value);
        let status = 'backlog';
    let statusToDo = getId('statusToDo');
    if (statusToDo.checked) {
        status = 'todo';
    } 
    return { title, description, category, dueDate, importance, assignedTo,status}
}