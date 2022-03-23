let allTasks = [];
let users = {};
let categories = [];
//maximum number of people that can be assigned to one task
let maxTeamSizePerTask;
let highestTaskId = -1;
let currentTask = {};
let now = new Date();
let today = now.toISOString().slice(0, 10);
let timeout = 500;// timeout to prevent simultaneous saving and loading from server


/////////////////////////////////////////////////////////////////////////////////////////////// 
/* helper functions */
function getId(id) {
    return document.getElementById(id);
}


/**
 * changes the first letter of a string to upper case
 * @param {string} word - the word to capitalize
 * @returns capitalized word
 */
function firstLetterUpper(word) {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
}

///////////////////////////////////////////////////////////////////
//functions concerning menu

/**
 * switches between menu shown and hidden (narrow screens only)
 */
function toggleMenu() {
    let menubar = getId('menubar');
    if (menubar.style.left == 'var(--menu-width-neg)' || menubar.style.left == '') {
        menubar.style.left = '0';
    } else {
        menubar.style.left = 'var(--menu-width-neg)';
    }
}


/**
 * hides menu (narrow screens only)
 */
function hideMenu() {
    let menubar = getId('menubar');
    menubar.style.left = 'var(--menu-width-neg)';
}