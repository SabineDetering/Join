
function signIn(event) {
    event.preventDefault();
    let email = getId('login-email').value;
    let password = getId('login-passwort').value;
    let userFound = false;
    let checkBox = getId('guest');

    if (checkBox.checked) {//sign-in as guest
        location.href = 'board.html';

    } else {
        for (const name in users) {

            if (email == users[name].email) {

                if (password == users[name].password) {
                    location.href = 'board.html';
                    userFound = true;
                } else { alert('The password is not correct. Please try again or sign in as guest.'); }
            }
        }
        if (!userFound) {
            alert('Your email address is not yet registered. Please sign in as a guest.');
        }
    }
}