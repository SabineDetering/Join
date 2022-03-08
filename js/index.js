function signIn() {
    if (getId('guest').checked) {
        location.href = 'http://127.0.0.1:5500/board.html?'
    } if (!getId('guest').checked) {
        alert('Please Sign-In as Guest')
    }
}