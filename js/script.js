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
            <span class="staff-icon bg-ci-dark p-2 me-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">${staffIconContent(user)}</span>

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
        return `<span class="staff-icon bg-ci-dark p-2 me-1">${staffIconContent(user)}</span>`;
    }
}

function removeUser(name) {
    currentTask.assignedTo = currentTask.assignedTo.filter(user => user != name);
    showAssignedUsers();
}
