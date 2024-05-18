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
  .then(response => {console.log('Response status:', response.status);
  return response.json();
  })
  .then(data => {
    console.log ('Response data:', data);

    if (data.data && data.data.email) {
      console.log('Logged in!');
      window.location.href = '../index.html';
    } else {
      console.log('Login failed:', data.message || 'Unknown Error');
      errorMessage.textContent = data.message || 'Login failed. Please try again.';
    }
  })
  .catch(error => {
    console.error('Error logging in:', error);
    errorMessage.textContent = 'Error logging in. Contact IT-department.';
  });
});

