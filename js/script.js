// function login(){
//     document.getElementById('login').style.display = 'none';
//     document.getElementById('logout').style.display = 'flex';
// }

// function logout(){
//     document.getElementById('login').style.display = 'flex';
//     document.getElementById('logout').style.display = 'none';
// }

let allTasks = [];

function getId(id) {
    return document.getElementById(id);
}

function save(array, arrayName) {
    backend.setItem(arrayName, JSON.stringify(array));
}

