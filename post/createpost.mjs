import { API_BLOG_URL } from "../utils/constants.mjs";

function isLoggedIn() {
  const token = localStorage.getItem('accessToken');
  return !!token;
}

function handleLogout() {
  localStorage.removeItem('accessToken');
  window.location.href = '../account/login.html';
}

function updateUI() {
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const logoutBtn = document.getElementById('logout-btn');

  if (isLoggedIn()) {
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
  } else {
    loginBtn.style.display = 'block';
    registerBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
  }
}

document.getElementById('logout-link').addEventListener('click', handleLogout);

updateUI();


document.getElementById('create-post-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const title = formData.get('title')
  const body = formData.get('body')
  const imageURL = document.getElementById('image-url').value;
  const imageAltText = document.getElementById('image-alt-text').value;

  const newPostData = {
    title,
    body,
    media: {
      url: imageURL,
      alt: imageAltText
    }
  };

  try {
    const response = await fetch(API_BLOG_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(newPostData)
    });

    if (!response.ok) {
      throw new Error(`Error creating post: ${response.status}`);
    } else {
      alert('Post created successfully.')
      window.location.href = '../index.html';
    }
  } catch (error) {
    console.error('Error creating post:', error);
    alert ('Error creating post:' + error.message);
  }
});