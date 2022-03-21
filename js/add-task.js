/**
 * loads data from server if function is called onload
 * calls functions to fill dropdown menus in add tasks form dynamically
 * @param {boolean} onload - is set to true only when function is called onload
 */
async function renderAddTaskForm(onload = false) {
    if (onload) {
        await init();
    }
    if (allTasks.length > 0) {
        highestTaskId = allTasks[allTasks.length - 1].id;
    }
    currentTask = {};
    currentTask.assignedTo = [];
    fillCategorySelector();
    restrictDueDate();
    fillAssignedToList();
}

/////////////////////////////////////////////////////////////////
// functions concerning categories

/**
 * fills the drop down list for categories with all category names from array categories
 * additional option "New category" allows adding a new Category
 */
function fillCategorySelector() {
    let selector = getId('category');
    selector.innerHTML = '';
    selector.innerHTML += optionMaker('Choose...', '', 'selected');
    for (let i = 0; i < categories.length; i++) {
        selector.innerHTML += optionMaker(categories[i]);
    }
    selector.innerHTML += optionMaker('New category', 'new');
}


/**
 * renders an option for select-tag
 * @param {string} text - the text shown in the drop down menu
 * @param {string} value - the value saved on selection (optional)
 * @param {string} attributes - attributes for the option e.g. 'selected' (optional)
 * @returns html code of the option
 */
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
 * triggers that a modal is shown when "new Category" is selected
 * modal allows to enter a new category name
 */
function checkIfNewCategorySelected() {
    let catSelector = getId('category');
    let category = catSelector[catSelector.selectedIndex].value;
    if (category == 'new') {
        let catModal = new bootstrap.Modal(getId('addCategoryModal'), {});
        catModal.show();
    }
}


/**
 * adds a new category name to the list of categories (first letter is changed to upper case)
 * new category name selected
 */
function addCategory() {
    let categoryInput = getId('new-category');
    let newCategory = categoryInput.value;
    if (newCategory) {//input field not empty
        newCategory = firstLetterUpper(newCategory);
        if (isNewCategory(newCategory)) {
            integrateNewCategory(newCategory);
        }
        selectCategory(newCategory);
    } else {
        resetCategory();
    }
    categoryInput.value = '';
}


/**
 * returns true if cat is not in array categories i.e. if cat is indeed a new category name
 * @param {string} cat - category to check
 * @returns boolean
 */
function isNewCategory(cat) {
    return categories.indexOf(cat) == -1;
}


/**
 * updates array categories 
 * sorts the list alphabetically
 * saves sorted list to the server
 * shows updated list in addTask 
 * @param {string} cat - the new category name
 */
function integrateNewCategory(cat) {
    categories.push(cat);
    categories.sort();
    save(categories, 'categories');
    fillCategorySelector();
}


/**
 * sets selected value of category list to default
 * (used if new category was selected but no new category was entered)
 */
function resetCategory() {
    let catSelector = getId('category');
    catSelector.selectedIndex = 0;
}


/**
 * selects category cat in drop down list of categories
 * @param {string} cat - name of category to be selected
 */
function selectCategory(cat) {
    let catSelector = getId('category');
    let index = categories.indexOf(cat);
    catSelector.selectedIndex = index + 1;//first option is "Choose.."
}

///////////////////////////////////////////////////////////////////
//functions concerning due date

/**
 * only future dates are feasible as due date
 */
function restrictDueDate() {
    let dueDate = getId('due-date');
    dueDate.min = today;
}

///////////////////////////////////////////////////////////////////
//functions concerning assigned to

/**
 * shows icon(s) for assigned user(s)
 * if it is feasible to add more staff to the task, plus icon is shown
 */
function showAssignedUsers() {
    let assignedTo = getId('assigned-to');
    assignedTo.innerHTML = '';
    for (let i = 0; i < currentTask.assignedTo.length; i++) {
        const name = currentTask.assignedTo[i];
        assignedTo.innerHTML += staffIconHtml(name);
    }
    if (moreStaffAllowed()) {
        assignedTo.innerHTML += addUserHtml();
        fillAssignedToList();
    }
}

///////////////////////////////////////////////////////////////////////
//functions concerning retrieving data from the form

/**
 * retrieves data from addtask form as json and pushes it into array allTasks
 * unique id for each task
 * calls saving allTasks
 */
function addTask(event) {
    event.preventDefault();
    //merge currentTask (only assignedTo) with other task data
    currentTask = Object.assign(currentTask, getTaskData());
    highestTaskId++;
    currentTask.id = highestTaskId;
    allTasks.push(currentTask);
    save(allTasks, 'tasks');

    showSuccessMessage(currentTask.status);
    emptyForm();
    setTimeout(hideSuccessMessage, 2500);
}


/**
 * reads inputs from add-task form
 * @returns json with data of the task
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
    // array assignedTo was already filled during assignment
    let status = '';
    let statusToDo = getId('statusToDo');
    if (statusToDo.checked) {
        status = 'todo';
    } else {
        status = 'backlog';
    }
    //return task data as json
    return { title, description, category, dueDate, importance, status }
}


/**
 * shows success message
 * @param {string} status - status of the created task (backlog or todo)
 */
function showSuccessMessage(status) {
    let successMessage = getId('success');
    successMessage.innerHTML = `The task was created in ${status}.`;
    successMessage.classList.remove('invisible');
}


/**
 * makes success message invisible
 */
function hideSuccessMessage() {
    let successMessage = getId('success');
    successMessage.classList.add('invisible');
}


/**
 * resets addTask form completely
 */
function emptyForm() {
    currentTask = {};
    currentTask.assignedTo = [];
    let form = getId('task-form');
    form.reset();
    //reset assigned-to section to plus icon
    let assignedTo = getId('assigned-to');
    assignedTo.innerHTML = addUserHtml();
    fillAssignedToList();
}