setURL('http://developerakademie.com/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('tasks')) || [];
}
