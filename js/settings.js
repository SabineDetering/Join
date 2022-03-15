async function load() {
    await init();

    let teamSize = getId('teamSize');
    let numberOfTasks = getId('numberOfTasks');

    teamSize.selectedIndex = maxTeamSizePerTask - 1;
    numberOfTasks.selectedIndex = maxActiveTasksPerUser - 1;

}


function saveSettings(event) {
    event.preventDefault();

    let teamSize = getId('teamSize');
    let numberOfTasks = getId('numberOfTasks');

    maxTeamSizePerTask = +teamSize[teamSize.selectedIndex].value;
    maxActiveTasksPerUser = +numberOfTasks[numberOfTasks.selectedIndex].value;

    saveVar(maxActiveTasksPerUser, 'numberOfTasks');
    saveVar(maxTeamSizePerTask, 'teamSize');
}