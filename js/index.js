function signIn() {

    if (getId('guest').checked || getId('login-email').value == users['Tuncay Dağdelen']['email'] && getId('login-passwort').value == users['Tuncay Dağdelen']['password']) {
        location.href = 'http://127.0.0.1:5500/board.html?'
    } else {
        alert('Please Sign-In as Guest or Log-In')
    }
}