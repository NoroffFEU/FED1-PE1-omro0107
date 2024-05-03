
export function displayErrorMessage(message) {
  
  const errorMessageDiv = document.createElement('div');
  
  errorMessageDiv.style.backgroundColor = 'red';
  errorMessageDiv.style.color = 'white';
  errorMessageDiv.style.padding = '10px';
  errorMessageDiv.style.margin = '10px';
  errorMessageDiv.style.borderRadius = '5px';
  
  errorMessageDiv.textContent = message;
  
  // Append the error message div to the document body
  document.body.appendChild(errorMessageDiv);
}

displayErrorMessage('Woops, something is not working as it should. We are looking into it. Please try again soon.');