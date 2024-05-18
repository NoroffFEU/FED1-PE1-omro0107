// Create the form element
const form = document.createElement('form');
form.id = 'login-form';

// Create the email label and input elements
const emailLabel = document.createElement('label');
emailLabel.htmlFor = 'email';
emailLabel.textContent = 'Email';
const emailInput = document.createElement('input');
emailInput.type = 'text';
emailInput.id = 'email';
emailInput.name = 'email';
emailInput.required = true;
emailInput.autofill = 'email';

// Append the email label and input elements to the form
form.appendChild(emailLabel);
form.appendChild(emailInput);

// Create the password label and input elements
const passwordLabel = document.createElement('label');
passwordLabel.htmlFor = 'password';
passwordLabel.textContent = 'Password';
const passwordInput = document.createElement('input');
passwordInput.type = 'password';
passwordInput.id = 'password';
passwordInput.name = 'password';
passwordInput.required = true;

// Append the password label and input elements to the form
form.appendChild(passwordLabel);
form.appendChild(passwordInput);

// Create the submit button element
const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.textContent = 'Login';

// Append the submit button to the form
form.appendChild(submitButton);

// Select the container element and append the form to it
const container = document.querySelector('.container');
container.appendChild(form);