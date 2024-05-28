const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const loginData = {
    email: email,
    password: password
  };
  
  try {
    const response = await fetch('https://v2.api.noroff.dev/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('accessToken', data.data.accessToken);
      window.location.href = '../index.html';
    } else {
      errorMessage.textContent = data.message || 'Login failed. Please try again.';
    }
  } catch(error) {
    console.error('Error logging in:', error);
    errorMessage.textContent = 'Error logging in. Contact IT-department.';
  }
});

