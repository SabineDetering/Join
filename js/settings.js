/**
 * loads data from server
 * initialises drop down menus
 */
async function load() {
    await init();

    let teamSize = getId('teamSize');
    let numberOfTasks = getId('numberOfTasks');

    teamSize.selectedIndex = maxTeamSizePerTask - 1;
    numberOfTasks.selectedIndex = maxActiveTasksPerUser - 1;
}


/**
 * saves selected values
 * @param {*} event 
 */
function saveSettings() {
    // event.preventDefault();

    let teamSize = getId('teamSize');
    let numberOfTasks = getId('numberOfTasks');

    maxTeamSizePerTask = +teamSize[teamSize.selectedIndex].value;
    maxActiveTasksPerUser = +numberOfTasks[numberOfTasks.selectedIndex].value;

    save(maxActiveTasksPerUser, 'numberOfTasks');
    save(maxTeamSizePerTask, 'teamSize');

    getId('settings-message').innerHTML = 'Settings have been saved.'
}


/**
 * show values before change, changes are not saved
 */
function cancelChange() {
    let teamSize = getId('teamSize');
    let numberOfTasks = getId('numberOfTasks');

    teamSize.selectedIndex = maxTeamSizePerTask - 1;
    numberOfTasks.selectedIndex = maxActiveTasksPerUser - 1;

    getId('settings-message').innerHTML='Changes are reset.'
}