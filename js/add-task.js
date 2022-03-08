// categories = ['Backend', 'Frontend', 'Product Owner', 'UI/UX', 'Webdesign'];
// users = {
//     'Christian Aidelsburger': { name: 'Christian Aidelsburger', initials: 'CA', img: './img/chris-icon.png' ,email:'c.aidelsburger@web.de',password:''},
//     'Sabine Detering': { name: 'Sabine Detering', initials: 'SD', img: './img/bee.png', email: 'testmail@web.de', password: '' },
//     'Tuncay Dağdelen': { name: 'Tuncay Dağdelen', initials: 'TD', img: './img/tuncay-icon.png', email: 'muster@email.de', password: '' },
// };

/**
 * loads data from server
 * fills dropdown menus in add taks form dynamically
 */
async function renderAddTaskForm(onload=false) {
    if (onload) {
        await init();
    }
    if (!allTasks == []) {
        highestTaskId = allTasks[allTasks.length - 1].id;
    }
    currentTask = {};
    currentTask.assignedTo = [];
    fillCategorySelector();
    restrictDueDate();
    fillAssignedToList();
}
/////////////////////////////////////////////////////////////////
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
 * new category name selected
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
 * @param {string} cat -name of category to be selected
 */
function selectCategory(cat) {
    let catSelector = getId('category');
    let index = categories.indexOf(cat);
    catSelector.selectedIndex = index + 1;//first option is "Choose.."
}
///////////////////////////////////////////////////////////////////

/**
 * only future dates are feasible as due date
 */
function restrictDueDate() {
    let now = new Date();
    let today = now.toISOString().slice(0, 10);
    let dueDate = getId('due-date');
    dueDate.min = today;
}

///////////////////////////////////////////////////////////////////

/**
 * fills the drop down menu in the "assigned-to" section with all names from users (json)
 */
function fillAssignedToList() {
    let list = getId('assigned-to-list');
    list.innerHTML = '';
    for (const name in users) {
        if (!currentTask.assignedTo.includes(users[name].name)) {
            list.innerHTML += itemMaker(users[name].name);
        }
    }
}
/**
 * returns the html code for a list item consisting of an icon with the image or the initials of the user and the name of the user
 * @param {string} name - name of a user
 * @returns html code
 */
function itemMaker(name) {
    return `
        <li onclick = "assignUser('${users[name].name}')">
           <div class="d-flex"> ${staffIconHtml(name, false)} 
            <span>${users[name].name}<span>
            </div>
        </li >
    `;
}

function assignUser(name) {
    currentTask.assignedTo.push(name);
    showAssignedUsers();
}

function removeUser(name) {
    currentTask.assignedTo = currentTask.assignedTo.filter(user => user != name);
    showAssignedUsers();
}

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
/**
 * returns true, if task may be assigned to more users
 * @returns boolean
 */
function moreStaffAllowed() {
    return currentTask.assignedTo.length < maxTeamSizePerTask;
}

/**
 * @returns string - html code for plus icon and dropdown list
 */
function addUserHtml() {
    return `<div class="btn-group dropend">
                <img id="plus-icon" type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" src="img/icon plus.png" alt="add team member" title="add team member">

                <ul id="assigned-to-list" class="dropdown-menu p-2">
                </ul>
            </div>`
}

///////////////////////////////////////////////////////////////////////
/**
 * gets data from addtask form as json and pushes it into array allTasks
 * unique id for each task
 * initiates saving allTasks
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

function showSuccessMessage(status) {
    let successMessage = getId('success');
    successMessage.innerHTML = `The task was created in ${status}.`;
    successMessage.classList.remove('d-none');
}
function hideSuccessMessage() {
    let successMessage = getId('success');
    successMessage.classList.add('d-none');
}

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
