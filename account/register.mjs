const form = document.getElementById('register-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (name === '') {
    alert('Please enter your name');
    return;
  }

  if (email === '') {
    alert('Please enter your email');
    return;
  }

  if (!validateEmail(email)) {
    alert('Please enter a valid email');
    return;
  }

  if (password === '') {
    alert('Please enter your password');
    return;
  }

  if (password!== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  const user = {
    name,
    email,
    password
  };
  
  fetch('https://v2.api.noroff.dev/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      alert('Profile already exists');
    }
  })
  .then(data => {
    alert('New profile successfully created');
    console.log(data);
  })
  .catch(error => console.error(error));

  console.log(`New account created: ${name} ${email} ${password}`);
});

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
