/**
 * gets actual data from form as json and pushes it into allTasks
 * unique id for each task
 * initiates saving allTasks
 */
function addTask(event) {
    event.preventDefault();
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
    // get value of selected option
    let catSelector = getId('category');
    let category = catSelector[catSelector.selectedIndex].value;
    let dueDate = getId('due-date').value;//format "yyyy-mm-dd"    
    // get value of selected option
    let impSelector = getId('importance');
    let importance = impSelector[impSelector.selectedIndex].value;
    //get array with all selected options
    let assignSelector = getId('assigned-to');
    let selectedAssignOptions = Array.from(assignSelector.selectedOptions);
    // get values of (multiple) selected options 
    let assignedTo = selectedAssignOptions.map(option => option.value);
        let status = 'backlog';
    let statusToDo = getId('statusToDo');
    if (statusToDo.checked) {
        status = 'todo';
    }
    
    //empty the form
    let form = getId('task-form'); 
    form.reset(); 

    return { title, description, category, dueDate, importance, assignedTo,status}
}