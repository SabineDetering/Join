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

//backup for categories
/*
categories = ['Backend', 'Frontend', 'Product Owner', 'UI/UX', 'Webdesign'];
*/

//backup for users
/*
users = {
    'Christian Aidelsburger': { name: 'Christian Aidelsburger', initials: 'CA', img: './img/chris-icon.png', email: 'c.aidelsburger@web.de', password: '', activeTasks: 0 },
    'Sabine Detering': { name: 'Sabine Detering', initials: 'SD', img: './img/bee.png', email: 'testmail@web.de', password: '', activeTasks: 0 },
    'Tuncay Dağdelen': { name: 'Tuncay Dağdelen', initials: 'TD', img: './img/tuncay-icon.png', email: 'muster@email.de', password: 'password', activeTasks: 0 },
};
*/

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