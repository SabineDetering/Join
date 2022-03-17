/**
 * fuction to logging in to the site
 * checkes if e @ mail and password is correct
 * checkes if checkbox for guests is checked to enter site
 * else alert with error message
 */
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
                } else { getId('password-false').style.display = 'block'; return }
            }
        }
        if (!userFound) {
            getId('not-resgistred').style.display = 'block';
        }
    }
}