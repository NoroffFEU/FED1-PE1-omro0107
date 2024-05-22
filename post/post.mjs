import { API_BLOG_URL } from "../utils/constants.mjs";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id'); 
if (!postId) {
  console.error(`post id not found in url`)
}// Get post ID from URL

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
  const editPostBtn = document.getElementById('edit-post-btn');

  if (isLoggedIn()) {
    console.log('User is logged in. Showing logout button.');
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    editPostBtn.style.display = 'block';
  } else {
    console.log('User is not logged in. Showing login and register buttons')
    loginBtn.style.display = 'block';
    registerBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    editPostBtn.style.display = 'none';
  }
}

document.getElementById('logout-link').addEventListener('click', handleLogout);
document.getElementById('edit-post-btn').addEventListener('click', () => {
  window.location.href = `../post/edit.html?id=${postId}`;
});

updateUI();

async function fetchPostData() {
  const encodedPostId = encodeURIComponent(postId);
  const url = `${API_BLOG_URL}/${encodedPostId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching post data: ${response.status}`);
  }
  const data = await response.json();
  return data.data;
}

async function displayPost() {
  const postData = await fetchPostData();

  const postTitle = document.getElementById('post-title');
  const authorName = document.getElementById('author-name');
  const publishDate = document.getElementById('publish-date');
  const postImage = document.getElementById('post-image');
  const postContent = document.getElementById('post-content');

  postTitle.textContent = postData.title;
  authorName.textContent = postData.author.name;
  publishDate.textContent = new Date(postData.created).toLocaleDateString();
  if (postData.media && postData.media.url) {
    postImage.src = postData.media.url;
    postImage.alt = postData.media.alt;
  }
  postContent.innerHTML = postData.body;
}

const shareButton = document.getElementById('share-button');

shareButton.addEventListener('click', () => {
  const shareableUrl = `${window.location.origin}${window.location.pathname}?id=${postId}`;

  navigator.clipboard.writeText(shareableUrl);

  alert(`Post URL is copied to your clipboard!`);
});

displayPost();
