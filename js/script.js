// function login(){
//     document.getElementById('login').style.display = 'none';
//     document.getElementById('logout').style.display = 'flex';
// }

// function logout(){
//     document.getElementById('login').style.display = 'flex';
//     document.getElementById('logout').style.display = 'none';
// }

let allTasks = [];
let users = {};
let categories = [];
let maxTeamSizePerTask = 2;
let maxActiveTasksPerUser = 2;
let highestTaskId = -1;
let currentTask = {};
let now = new Date();
let today = now.toISOString().slice(0, 10);


function getId(id) {
    return document.getElementById(id);
}

function showMenu() {
    let menubar = getId('menubar');
    menubar.style.left = '0';
}
function hideMenu() {
    let menubar = getId('menubar');
    menubar.style.left = 'var(--menu-width-neg)';
}


/**
 * 
 * @param {string} user -name of a user
 * @returns either the image or the initials of a user
 */
function staffIconContent(user) {
    if (users[user].img) {
        return `<img src="${users[user].img}">`;
    } else {
        return `${users[user].initials}`;
    }
}

function staffIconHtml(user, onclick = true) {
    if (onclick) {
        return `
        <div class="btn-group dropend">
            <span class="staff-icon p-2 me-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">${staffIconContent(user)}</span>

             <ul class="dropdown-menu">
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
            </ul>
        </div>
        `;
    }
    else {
        return `<span class="staff-icon p-2 me-1">${staffIconContent(user)}</span>`;
    }
}

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
 * renders code for restore and delete buttons
 * @param {integer} i- index of the task 
 * @returns html code 
 */
function trashButtons(i) {
    return `<div class="d-flex w-100 justify-content-end">
                <img type="button" onclick="event.stopPropagation();restoreTask(${i})"
                class="trashbin p-2" src="./img/reuse.png" alt="restore to last status" title="restore to last status">

                <img type="button" onclick="event.stopPropagation();deleteTask(${i})"
                class="trashbin p-2" src="./img/delete.png" alt="delete irrevocably" title="delete irrevocably">
            </div>
            `;
}