// categories = ['Backend', 'Frontend', 'Product Owner','UI/UX', 'Webdesign'];

/**
 * loads data from server
 * fills dropdown menus in add taks form dynamically
 */
async function renderAddTaskForm() {
    await init();
    fillCategorySelector();
}

/**
 * fills the drop down menu for categories with all category names from array categories
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
 * @param {string} text - the text shown in the drop down
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
 * sorts the list alphabetically
 * saves sorted list to the server
 * shows updated list in addTask with new category name selected
 */
function addCategory() {
    let categoryInput = getId('new-category');
    let newCategory = categoryInput.value;
    if (newCategory) {
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
 * changes the first letter of a string to upper case
 * @param {string} word 
 * @returns 
 */
function firstLetterUpper(word) {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
}

/**
 * returns true if cat is not in array categories
 * @param {string} cat -category to check
 * @returns boolean
 */
function isNewCategory(cat) {
    return categories.indexOf(cat) == -1;
}

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
 * @param {string} cat -name of category to be selected
 */
function selectCategory(cat) {
    let catSelector = getId('category');
    let index = categories.indexOf(cat);
    catSelector.selectedIndex = index + 1;//first option is "Choose.."
}


///////////////////////////////////////////////////////////////////////
/**
 * gets data from addtask form as json and pushes it into array allTasks
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

    //return task data as json
    return { title, description, category, dueDate, importance, assignedTo, status }
}

function showSuccessMessage() {
    getId('success').classList.remove('d-none');
}
function hideSuccessMessage() {
    getId('success').classList.add('d-none');
}
