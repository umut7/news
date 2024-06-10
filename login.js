document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('data/users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password');
            }
        });
});
