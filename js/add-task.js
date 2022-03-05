// categories = [{key:'backend',text:'Backend'}, {key:'frontend',text:'Frontend'}, {key:'productOwner',text:'Product Owner'}, {key:'UI_UX',text:'UI/UX'}, {key:'webdesign',text:'Webdesign'}];
// categories = ['Backend', 'Frontend', 'Product Owner','UI/UX', 'Webdesign'];

async function renderAddTaskForm() {
    await init();
    fillCategorySelector();
}

function fillCategorySelector() {
    let selector = getId('category');
    selector.innerHTML = '';
    selector.innerHTML += optionMaker('Choose...','', 'selected');
    for (let i = 0; i < categories.length; i++) {
        // const cat = categories[i];
        // selector.innerHTML += optionMaker(cat['key'], cat['text']);
        selector.innerHTML += optionMaker(categories[i]);
    }
    selector.innerHTML += optionMaker('New category', 'new');
}

function optionMaker(text, value, attributes) {
    if (typeof (attributes) == 'undefined') {
        attributes = '';
    }
    if (typeof (value) == 'undefined') {
        return `<option ${attributes}>${text}</option>`;        
    } else {
        return `<option value="${value}" ${attributes}>${text}</option>`;
    }
}

/**
 * gets actual data from form as json and pushes it into array allTasks
 * unique id for each task
 * initiates saving allTasks
 */
function addTask(event) {
    event.preventDefault();
    let currentTask = getTaskData();
    currentTask.id = allTasks.length + 1;
    allTasks.push(currentTask);
    save(allTasks, 'tasks');
    save(categories, 'categories');
    showSuccessMessage();
    setTimeout(hideSuccessMessage, 2500);
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

function showSuccessMessage() {
    getId('success').classList.remove('invisible');
}
function hideSuccessMessage() {
    getId('success').classList.add('invisible');
}
