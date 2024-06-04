document.addEventListener('DOMContentLoaded', () => {
    const formTitle = document.getElementById('form-title');
    const authForm = document.getElementById('auth-form');
    const toggleButton = document.getElementById('toggle-button');
    const messageDiv = document.getElementById('message');

    let isLoginMode = true;

    toggleButton.addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        if (isLoginMode) {
            formTitle.textContent = 'Login';
            authForm.querySelector('button').textContent = 'Login';
            toggleButton.textContent = 'not a user? Switch to Register';
        } else {
            formTitle.textContent = 'Register';
            authForm.querySelector('button').textContent = 'Register';
            toggleButton.textContent = 'Switch to Login';
        }
        messageDiv.textContent = '';
    });

    authForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const endpoint = isLoginMode ? '/auth/login' : '/auth/register';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                messageDiv.style.color = 'green';
                if (isLoginMode) {
                    messageDiv.textContent = 'Login successful!';
                    console.log(data.token);
                    window.location.href = '/home';
                } else {
                    messageDiv.textContent = 'Registration successful!';
                }
            } else {
                messageDiv.style.color = 'red';
                messageDiv.textContent = data.message || (isLoginMode ? 'Login failed' : 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.style.color = 'red';
            messageDiv.textContent = 'An error occurred';
        }
    });
});
