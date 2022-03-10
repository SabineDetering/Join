
function signIn() {
    let email = getId('login-email').value;
    let password = getId('login-passwort').value;
    let userFound = false;
    let checkBox = getId('guest');

    if (checkBox.checked) {
        window.open('board.html');

    } else {
        for (const name in users) {

            if (email == users[name].email) {

                if (password == users[name].password) {
                    window.open('board.html');
                    userFound = true;
                }
            }
        }
        if (!userFound) {
            alert('Please Sign-In as Guest or Log-In');
        }
    }
}