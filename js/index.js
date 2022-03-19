/**
 * function to log in to the site
 * if checkbox for guests is checked => direct log-in  
 * checks if email is belongs to a registered user and checks if password is correct
 * displays messages otherwise
 */
function signIn(event) {
    event.preventDefault();
    let email = getId('login-email').value;
    let password = getId('login-passwort').value;
    let checkBox = getId('guest');

    if (checkBox.checked) {//sign-in as guest
        location.href = 'board.html';

    } else {
        for (const name in users) {

            if (email == users[name].email) {

                if (password == users[name].password) {
                    location.href = 'board.html';
                } else {
                    getId('password-false').style.display = 'block';
                    getId('not-registered').style.display = 'none';
                }
                return;
            }
        }
             getId('not-registered').style.display = 'block';
            getId('password-false').style.display = 'none';
    }
}


/**
 * if checkbox for log-in as guest is checked, input fields are disabled
 * if it is unchecked, input fields are enabled again
 */
function toggleInputDisable() {
    let checkbox = getId('guest');
    let emailField = getId('login-email');
    let passwordField = getId('login-passwort');
    if (checkbox.checked) {
        emailField.disabled = true;
        passwordField.disabled = true;
    } else {
        emailField.disabled = false;
        passwordField.disabled = false;
    }
}