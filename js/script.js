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

function getId(id) {
    return document.getElementById(id);
}

function save(array, arrayName) {
    backend.setItem(arrayName, JSON.stringify(array));
}

