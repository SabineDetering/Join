function renderTrashTasks(onload = false) {
    if (onload) {
        await init();
    }
    
    let trash = getId('todo');
    trash.innerHTML = '';

    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        if (task.status == 'trash') {
            trash.innerHTML += trashCard(i);
        }
    }
}

function trashCard(i) {
    
}
