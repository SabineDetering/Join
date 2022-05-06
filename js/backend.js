setURL('https://sabine-detering.de/join/smallest_backend_ever');

/**
 * loads data from server
 */
async function init() {
    //timeout to prevent conflict with earlier saving process
    await new Promise(resolve => setTimeout(resolve, timeout));
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    allTasks = JSON.parse(backend.getItem('tasks')) || [];
    maxTeamSizePerTask = +JSON.parse(backend.getItem('teamSize') )|| 2;
}


/**
 * saves data to server
 * @param {array} array - variable name of the array to save
 * @param {string} arrayName - string to refer to the array on the server
 */
async function save(array, arrayName) {
    backend.setItem(arrayName, JSON.stringify(array));
}