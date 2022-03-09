function signIn() {

    if (getId('guest').checked || (getId('login-email').value == users['Sabine Detering']['email'] && getId('login-passwort').value == users['Sabine Detering']['password']) || (getId('login-email').value == users['Christian Aidelsburger']['email'] && getId('login-passwort').value == users['Christian Aidelsburger']['password']) || (getId('login-email').value == users['Tuncay Dağdelen']['email'] && getId('login-passwort').value == users['Tuncay Dağdelen']['password'])) {
        location.href = 'http://127.0.0.1:5500/board.html?'


    } else {
        alert('Please Sign-In as Guest or Log-In')
    }

}


// for (let i = 0; i < users.length; i++) {
//     let element = users[i];
//     let email = element['name']
//     let password = element['password']

    
// }