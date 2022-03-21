/**
 * loads data from server
 * initialises drop down menus
 */
async function renderSettings(onload=false) {
    if (onload) {
        await init();
    }
    let teamSize = getId('teamSize');
    let numberOfTasks = getId('numberOfTasks');

    teamSize.selectedIndex = maxTeamSizePerTask - 1;
    numberOfTasks.selectedIndex = maxActiveTasksPerUser - 1;
    checkActiveTasks();
}


/**
 * saves selected settings if possible
 */
function saveSettings() {
    let teamSize = getId('teamSize');
    let numberOfTasks = getId('numberOfTasks');
    let settingsMessage = getId('settings-message');

    maxTeamSizePerTask = +teamSize[teamSize.selectedIndex].value;
    maxActiveTasksPerUser = +numberOfTasks[numberOfTasks.selectedIndex].value;

    let busyPerson = personWithTooManyTasks(maxActiveTasksPerUser);

    if (busyPerson == '') {
        save(maxActiveTasksPerUser, 'numberOfTasks');
        save(maxTeamSizePerTask, 'teamSize');
        settingsMessage.innerHTML = 'Settings have been saved.'
        settingsMessage.classList.remove('text-danger');
        settingsMessage.classList.add('text-success');
    } else {
        settingsMessage.innerHTML = `Your changes can not be saved.<br> ${busyPerson} is assigned to more than ${maxActiveTasksPerUser} tasks.`
        settingsMessage.classList.remove('text-success');
        settingsMessage.classList.add('text-danger');
    }
}


/**
 * returns the name of the first person that exceeds the limit for active tasks
 * returns '' if no person exceeds limit
 * @param {integer} limit - new maxActiveTasksPerUser 
 * @returns string
 */
function personWithTooManyTasks(limit) {
    for (const name in users) {
        if (users[name].activeTasks > limit) {
            return users[name].name;
        };
    }
    return '';
}


/**
 * resets to values before change, changes are not saved
 */
function cancelChange() {
    let teamSize = getId('teamSize');
    let numberOfTasks = getId('numberOfTasks');
    let settingsMessage = getId('settings-message');

    teamSize.selectedIndex = maxTeamSizePerTask - 1;
    numberOfTasks.selectedIndex = maxActiveTasksPerUser - 1;

    settingsMessage.innerHTML = 'Changes are reset.'
    settingsMessage.classList.remove('text-danger');
    settingsMessage.classList.add('text-success');
}