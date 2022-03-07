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
let currentTask = {};

function getId(id) {
    return document.getElementById(id);
}

function save(array, arrayName) {
    backend.setItem(arrayName, JSON.stringify(array));
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

function staffIconHtml(user) {
    return `<span class="staff-icon bg-ci-dark p-2 me-1">${staffIconContent(user)}</span>`;
}
