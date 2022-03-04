setURL('http://gruppe-194.developerakademie.net/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    user = JSON.parse(backend.getItem('user')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    allTasks = JSON.parse(backend.getItem('tasks')) || [];
}
