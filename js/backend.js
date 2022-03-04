setURL('http://gruppe-194.developerakademie.net/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('tasks')) || [];
}
