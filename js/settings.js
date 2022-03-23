/**
 * loads data from server
 * initialises drop down menus
 * @param {boolean} onload - is set to true only when function is called onload
 */
async function renderSettings(onload = false) {
    if (onload) {
        await init();
    }
    let teamSize = getId('teamSize');
    teamSize.selectedIndex = maxTeamSizePerTask - 1;
}


/**
 * saves selected settings if possible
 */
function saveSettings() {
    let teamSize = getId('teamSize');
    let settingsMessage = getId('settings-message');

    maxTeamSizePerTask = +teamSize[teamSize.selectedIndex].value;

    save(maxTeamSizePerTask, 'teamSize');
    settingsMessage.innerHTML = 'Settings have been saved.'
}


/**
 * resets settings to values before change, changes are not saved
 */
function cancelChange() {
    let teamSize = getId('teamSize');
    let settingsMessage = getId('settings-message');

    teamSize.selectedIndex = maxTeamSizePerTask - 1;

    settingsMessage.innerHTML = 'Changes are reset.'
    save(maxTeamSizePerTask, 'teamSize');
} 