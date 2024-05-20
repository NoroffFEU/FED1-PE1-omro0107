import { API_BLOG_URL } from "../utils/constants.mjs";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id'); 
if (!postId) {
  console.error(`post id not found in url`)
}

function isLoggedIn() {
  const token = localStorage.getItem('accessToken');
  console.log('Access Token', token)
  return !!token;
}

function handleLogout() {
  localStorage.removeItem('accessToken');
  console.log('Logged out.');
  window.location.href = '../account/login.html';
}

function updateUI() {
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const logoutBtn = document.getElementById('logout-btn');

  if (isLoggedIn()) {
    console.log('User is logged in. Showing logout button.');
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
  } else {
    console.log('User is not logged in. Showing login and register buttons')
    loginBtn.style.display = 'block';
    registerBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
  }
}

document.getElementById('logout-link').addEventListener('click', handleLogout);

updateUI();

document.getElementById('delete-post-btn').addEventListener('click', async () => {
  try {
    const response = await fetch(`${API_BLOG_URL}/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error deleting post: ${response.status}`);
    }

    window.location.href = '../index.html';
  } catch (error) {
    console.error('Error deleting post:', error);
  }
});

document.getElementById('edit-post-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const formData = new FormData(event.target);

  const imageURL = document.getElementById('image-url').value;

  formData.append('media', JSON.stringify({
    url: imageURL,
    alt: 'Image Alt Text'
  }));

  const updatedPostData = {
    title: formData.get('title'),
    body: formData.get('body'),
    tags: ['tag1', 'tag2'],
    media: JSON.parse(formData.get('media'))
  };
  
  try {
    const response = await fetch(`${API_BLOG_URL}/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(updatedPostData)
    });

    if (!response.ok) {
      throw new Error(`Error updating post: ${response.status}`);
    }

    window.location.href = '../index.html';
  } catch (error) {
    console.error('Error updating post:', error);
  }
});
