async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('tasks')) || [];
}
