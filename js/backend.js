setURL('http://gruppe-194.developerakademie.net/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    allTasks = JSON.parse(backend.getItem('tasks')) || [];
}

async function save(array, arrayName) {
    backend.setItem(arrayName, JSON.stringify(array));
}
