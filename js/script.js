let allTasks = [];
let users = {};
let categories = [];
//maximum number of people that can be assigned to one task
let maxTeamSizePerTask;
//maximum number of active tasks (in progress, testing) that one person can be assigned to
let maxActiveTasksPerUser;
let highestTaskId = -1;
let currentTask = {};
let now = new Date();
let today = now.toISOString().slice(0, 10);


function getId(id) {
    return document.getElementById(id);
}


// function showMenu() {
//     let menubar = getId('menubar');
//     menubar.style.left = '0';
// }



function toggleMenu() {
    let menubar = getId('menubar');
    if (menubar.style.left == '') {
        menubar.style.left = '0';
    } else {
        if (menubar.style.left == 'var(--menu-width-neg)') {
            menubar.style.left = '0';
        } else {
            menubar.style.left = 'var(--menu-width-neg)';
        }
    }


}




function hideMenu() {
    let menubar = getId('menubar');
    menubar.style.left = 'var(--menu-width-neg)';
}


/**
 * 
 * @param {string} user - name of a user
 * @returns either the image or the initials of a user
 */
function staffIconContent(user) {
    if (users[user].img) {
        return `<img title="${users[user].name}" src="${users[user].img}">`;
    } else {
        return `${users[user].initials}`;
    }
}


/**
 * creates html code for staff icons 
 * if clickable is true, a drop down list is appended to the icon, showing name and email of the user and allowing to remove the user from the assignedTo array
 * @param {string} user 
 * @param {boolean} clickable - true if icon must have a drop down list
 * @returns 
 */
function staffIconHtml(user, clickable = true) {
    if (clickable) {
        return `
        <div class="btn-group dropend">
            <span class="staff-icon p-2 me-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">${staffIconContent(user)}</span>
            ${dropDownHtml(user)}            
        </div>
        `;
    }
    else {
        return `<span class="staff-icon p-2 me-1">${staffIconContent(user)}</span>`;
    }
}

/**
 * creates html code for drop down appended to a staff icon
 * content: name, email, possibility to remove user from assignedTo array
 * @param {string} user - name of user
 * @returns html code
 */
function dropDownHtml(user) {
    return `<ul class="dropdown-menu">
                 <li>
                    <span class="dropdown-item disabled">${user}</span>
                 </li>
                 <li>
                    <a class="dropdown-item" href="mailto:${users[user].email}">${users[user].email}</a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                    <a class="dropdown-item" onclick = "removeUser('${user}')">Remove from task</a>
                </li>
            </ul>`;
}


/**
 * removes a user form being assigned to a task
 * updates the presentation of assigned to users
 * @param {string} name - name of user in array assignedTo 
 */
function removeUser(name) {
    currentTask.assignedTo = currentTask.assignedTo.filter(user => user != name);
    showAssignedUsers();
}


/**
 * renders html code for icon and name for each person assigned to a task
 * @param {integer} i -index of the task 
 * @returns html code
 */
function getTeam(i) {
    let team = allTasks[i].assignedTo;
    let html = '';
    if (team.length > 0) {
        html += '<div class="px-0">';
        for (let j = 0; j < team.length; j++) {
            const name = team[j];
            html += `
                <div class="px-0 d-flex flex-column flex-sm-row">
                    ${staffIconHtml(name)} <p>${name}</p> 
                </div>
                `;
        }
        html += '</div>';
    } else { html = `<div>&nbsp;</div>` }
    return html;
}


/**
 * renders html code for restore and delete buttons
 * @param {integer} i - index of the task 
 * @returns html code 
 */
function trashButtons(i) {
    return `<div class="d-flex w-100 justify-content-end">
                <img type="button" onclick="event.stopPropagation();restoreTask(${i})"
                class="trashbin p-2" src="./img/reuse.png" alt="restore to last status" title="restore to todo">

                <img type="button" onclick="event.stopPropagation();deleteTask(${i})"
                class="trashbin p-2" src="./img/delete.png" alt="delete irrevocably" title="delete irrevocably">
            </div>
            `;
}