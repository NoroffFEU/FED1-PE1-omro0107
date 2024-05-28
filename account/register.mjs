const form = document.getElementById('register-form');

form.addEventListener('submit', async (e) => {
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
  
  try{
    const response = await fetch('https://v2.api.noroff.dev/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
      });

    if (response.ok) {
      const data = await response.json();
      alert('New profile successfully created');
      console.log(data);
    } else {
      alert('Profile already exists');
    }
  } catch (error) {
     console.error(error);
}
});

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
