import { API_BLOG_URL } from "./utils/constants.mjs";
import { doFetch } from "./utils/dofetch.mjs";

function isLoggedIn() {
  const token = localStorage.getItem('accessToken');
  return !!token;
}

function handleLogout() {
  localStorage.removeItem('accessToken');
  window.location.href = 'account/login.html';
}

function updateUI() {
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const createNewPostBtn = document.getElementById('create-new-post-btn');

  if (isLoggedIn()) {
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    createNewPostBtn.style.display = 'block';
    logoutBtn.style.display = 'block';
  } else {
    loginBtn.style.display = 'block';
    registerBtn.style.display = 'block';
    createNewPostBtn.style.display = 'none';
    logoutBtn.style.display = 'none';
  }
}

document.getElementById('logout-link').addEventListener('click', handleLogout);

updateUI();

let posts = [];

function generatePostHtml(post) {
  const postWrapper = document.createElement('div');
  postWrapper.classList.add('post-wrapper');

  const postContainer = document.createElement('div');
  postContainer.classList.add('post-container');

  const contentDiv = document.createElement('div')
  contentDiv.classList.add('content-div');

  const heading = document.createElement('h1');
  heading.textContent = post.title;

  const viewPostButton = document.createElement('button');
  viewPostButton.textContent = 'View Post';
  viewPostButton.classList.add('view-post-btn');
  viewPostButton.addEventListener('click', () => {
    window.location.href = `post/index.html?id=${post.id}`; 
  });

  const postImage = document.createElement('img');
  postImage.src = post.media.url;
  postImage.alt = post.media.alt;
  postImage.classList.add('post-image');

  contentDiv.appendChild(heading);
  contentDiv.appendChild(viewPostButton);

  postContainer.appendChild(contentDiv);
  postContainer.appendChild(postImage);

  postWrapper.appendChild(postContainer)

  return postWrapper;
}

let currentIndex = 0;

function showPost(index) {
  const postsDisplay = document.getElementById('posts-display');
  const postWrapper = postsDisplay.querySelector('.post-wrapper')
  const postWidth = postsDisplay.clientWidth;
  postsDisplay.style.transform = `translateX(-${index * postWidth}px)`;
}

document.getElementById('next-btn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % 3;
  showPost(currentIndex);
});

document.getElementById('prev-btn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + 3) % 3;
  showPost(currentIndex);
});

function displayPosts(fetchedPosts) {
  const postsDisplayContainer = document.getElementById('posts-display');
  postsDisplayContainer.innerHTML = '';

  fetchedPosts.slice(0, 3).forEach((post) => {
    const postHtml = generatePostHtml(post);
    postsDisplayContainer.appendChild(postHtml);
  });
  showPost(0);
}

function displayPostThumbnails(posts) {
  const postThumbnailsContainer = document.getElementById('post-thumbnails');
  postThumbnailsContainer.innerHTML = '';

  const latestPosts = posts.slice(-12);

  latestPosts.forEach(post => {
    const postThumbnail = document.createElement('div');
    postThumbnail.classList.add('blogpost');

    const thumbnailImage = document.createElement('img');
    thumbnailImage.src = post.media.url;
    thumbnailImage.alt = post.media.alt;
    thumbnailImage.classList.add('blogpostimg');

    const postDate = document.createElement('div');
    postDate.classList.add('post-date');
    const postDateObj = new Date(post.updated);
    const options = { month: 'short', day: '2-digit' };
    postDate.textContent = postDateObj.toLocaleDateString('en-US', options);

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-ellipsis');

    const dateAndIconContainer = document.createElement('div');
    dateAndIconContainer.classList.add('date-icon-container');
    dateAndIconContainer.appendChild(postDate);
    dateAndIconContainer.appendChild(icon);

    const postTitle = document.createElement('h2');
    postTitle.textContent = post.title;

    postThumbnail.appendChild(thumbnailImage);
    postThumbnail.appendChild(dateAndIconContainer);
    postThumbnail.appendChild(postTitle);

    postThumbnail.addEventListener('click', () => {
      window.location.href = `post/index.html?id=${post.id}`; 
    });

    postThumbnailsContainer.appendChild(postThumbnail);
  });
}

function sortPosts(posts, criteria) {
  if (criteria === 'date') {
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (criteria === 'title') {
    return posts.sort((a, b) => a.title.localeCompare(b.title));
  }
  return posts;
}

document.getElementById('sort-posts').addEventListener('change', (event) => {
  const sortedPosts = sortPosts([...posts], event.target.value);
  displayPostThumbnails(sortedPosts);
});

async function main() {
  try {
    document.getElementById('loader').style.display = 'block';

    const responseData = await doFetch(API_BLOG_URL);
    if (!responseData || !responseData.data) {
      throw new Error('Failed to fetch post data from the API');
    }

    posts.push(...responseData.data);
    displayPosts(posts);
    displayPostThumbnails(responseData.data);
    
    document.getElementById('loader').style.display = 'none';
  } catch (error) {
    console.error('An error occurred:', error.message);
    alert('Oops! Something went wrong while fetching posts. Please try again later.');
  }
}

main();
