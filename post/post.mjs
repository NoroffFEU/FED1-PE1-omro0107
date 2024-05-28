import { API_BLOG_URL } from "../utils/constants.mjs";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id'); 
if (!postId) {
  console.error(`post id not found in url`)
}

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
  const editPostBtn = document.getElementById('edit-post-btn');
  const createNewPostBtn = document.getElementById('create-new-post-btn');

  if (isLoggedIn()) {
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    createNewPostBtn.style.display = 'block';
  } else {
    loginBtn.style.display = 'block';
    registerBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    createNewPostBtn.style.display = 'none';
  }
}

document.getElementById('logout-link').addEventListener('click', handleLogout);

updateUI();

const loader = document.getElementById('loader')

async function fetchPostData() {
  try {
      loader.style.display = 'block';
      
    const encodedPostId = encodeURIComponent(postId);
    const url = `${API_BLOG_URL}/${encodedPostId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching post data: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } finally {
    loader.style.display = 'none';
  }
}

async function displayPost() {
  const postData = await fetchPostData();

  const postContainer = document.getElementById('post-container');

  const postWrapper = document.createElement('div');
  postWrapper.classList.add('post-wrapper');

  const postContent = document.createElement('div');
  postContent.classList.add('post-content');

  const postHeader = document.createElement('div');
  postHeader.classList.add('post-header');

  const postTitle = document.createElement('h1');
  postTitle.textContent = postData.title;

  const postInfo = document.createElement('div');
  postInfo.classList.add('post-info');

  const authorName = document.createElement('span');
  authorName.textContent = postData.author.name;

  const publishDate = document.createElement('span');
  publishDate.textContent = new Date(postData.created).toLocaleDateString();

  postInfo.appendChild(authorName);
  postInfo.appendChild(publishDate);

  postContent.appendChild(postTitle);
  postContent.appendChild(postInfo);

  const postBlog = document.createElement('div');
  postBlog.classList.add('post-blog');
  postBlog.innerHTML = postData.body;

  postContent.appendChild(postHeader);
  postContent.appendChild(postBlog);

  const postImage = document.createElement('img');
  postImage.classList.add('postimg')
  if (postData.media && postData.media.url) {
    postImage.src = postData.media.url;
    postImage.alt = postData.media.alt;
  }

  postWrapper.appendChild(postImage);
  postWrapper.appendChild(postContent);

  const editPostBtn = document.createElement('button');
  editPostBtn.textContent = 'Edit Post';
  editPostBtn.style.display = 'none';

  const shareButton = document.createElement('button');
  shareButton.textContent = 'Share';

  postWrapper.appendChild(editPostBtn);
  postWrapper.appendChild(shareButton);

  postContainer.appendChild(postWrapper);

  if (isLoggedIn()) {
    editPostBtn.style.display = 'block';
    editPostBtn.addEventListener('click', () => {
      window.location.href = `../post/edit.html?id=${postId}`;
    });
  }

  shareButton.addEventListener('click', () => {
    const shareableUrl = `${window.location.origin}${window.location.pathname}?id=${postId}`;
    navigator.clipboard.writeText(shareableUrl);
    alert(`Post URL is copied to your clipboard!`);
  });
}


displayPost();
