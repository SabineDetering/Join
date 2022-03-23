// data to initialise categories and users
// only needed, if data on the server is lost
// in this case: execute the following code in the console

categories = ['Backend', 'Frontend', 'Product Owner', 'UI/UX', 'Webdesign'];

users = {
    'Christian Aidelsburger': {
        name: 'Christian Aidelsburger',
        initials: 'CA',
        img: './img/chris-icon.png',
        email: 'c.aidelsburger@web.de',
        password: '',
        ctiveTasks: 0
    },
    'Sabine Detering': {
        name: 'Sabine Detering',
        initials: 'SD',
        img: './img/bee.png',
        email: 'testmail@web.de',
        password: '',
        activeTasks: 0
    },
    'Tuncay Dağdelen': {
        name: 'Tuncay Dağdelen',
        initials: 'TD',
        img: './img/tuncay-icon.png',
        email: 'muster@email.de',
        password: 'password',
        activeTasks: 0
    },
};

save(categories, 'categories');
save(users, 'users');
