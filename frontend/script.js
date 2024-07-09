document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api'; // Modifier si le backend est sur un autre hôte/port

    // Registration Form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            try {
                const response = await fetch(`${apiUrl}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });
                const data = await response.json();
                document.getElementById('register-message').textContent = 'Registration successful!';
                console.log('Registration successful:', data);
            } catch (error) {
                document.getElementById('register-message').textContent = 'Registration failed!';
                console.error('Error:', error);
            }
        });
    }

    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            try {
                const response = await fetch(`${apiUrl}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });
                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'dashboard.html';
                } else {
                    document.getElementById('login-message').textContent = 'Login failed!';
                }
            } catch (error) {
                document.getElementById('login-message').textContent = 'Login failed!';
                console.error('Error:', error);
            }
        });
    }

    // Dashboard Page
    const dashboard = document.getElementById('tasks');
    if (dashboard) {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`${apiUrl}/tasks`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                const tasks = data.map(task => `<div>${task.title} - ${task.status}</div>`).join('');
                dashboard.innerHTML = tasks;
            })
            .catch(error => console.error('Error fetching tasks:', error));
        } else {
            window.location.href = 'login.html';
        }
    }
});
