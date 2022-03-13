setURL('http://gruppe-194.developerakademie.net/smallest_backend_ever');

/**
 * loads data from server
 */
async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    allTasks = JSON.parse(backend.getItem('tasks')) || [];
}


/**
 * saves data to server
 * @param {array} array - variable name of the array to save
 * @param {string} arrayName - string to refer to the array on the server
 */
async function save(array, arrayName) {
    backend.setItem(arrayName, JSON.stringify(array));
}