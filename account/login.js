const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const jwtToken = localStorage.getItem('jwtToken');

  const loginData = {
    email: email,
    password: password
  };

  fetch('https://v2.api.noroff.dev/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    },
    body: JSON.stringify(loginData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Logged in!');
      window.location.href = './index.html';
    } else {
      errorMessage.textContent = data.message;
    }
  })
  .catch(error => {
    console.error('Error logging in:', error);
    errorMessage.textContent = 'Error logging in. Contact IT-department.';
  });
});

