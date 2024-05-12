import { API_BLOG_URL } from "/utils/constants.mjs";
import { doFetch } from "/utils/dofetch.mjs";

let posts = [];

function generatePostHtml(post) {
  const postWrapper = document.createElement('div');
  postWrapper.classList.add('post-wrapper');

  const postContainer = document.createElement('div');
  postContainer.classList.add('post-container');

  const heading = document.createElement('h1');
  heading.textContent = post.title;

  const postImage = document.createElement('img');
  postImage.src = post.media.url;
  postImage.alt = post.media.alt;
  postImage.classList.add('post-image');

  const viewPostButton = document.createElement('button');
  viewPostButton.textContent = 'View Post';
  viewPostButton.classList.add('view-post-btn');
  viewPostButton.addEventListener('click', () => {
    window.location.href = `/post/index.html?id=${post.id}`; 
  });

  postContainer.append(heading, postImage, viewPostButton);
  postWrapper.appendChild(postContainer);

  return postWrapper;
}

let currentIndex = 0;

function showPost(index) {
  const postsDisplay = document.getElementById('posts-display');
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

  posts.forEach(post => {
    const postThumbnail = document.createElement('div');
    postThumbnail.classList.add('blogpost');

    const thumbnailImage = document.createElement('img');
    thumbnailImage.src = post.media.url;
    thumbnailImage.alt = post.media.alt;
    thumbnailImage.classList.add('blogpostimg');

    const postTitle = document.createElement('h2');
    postTitle.textContent = post.title;

    postThumbnail.appendChild(thumbnailImage);
    postThumbnail.appendChild(postTitle);

    postThumbnail.addEventListener('click', () => {
      window.location.href = `/post/index.html?id=${post.id}`; 
    });

    postThumbnailsContainer.appendChild(postThumbnail);
  });
}



async function main() {
  try {
    const responseData = await doFetch(API_BLOG_URL);
    if (!responseData || !responseData.data) {
      throw new Error('Failed to fetch post data from the API');
    }
    posts.push(...responseData.data);
    displayPosts(posts);
    displayPostThumbnails(responseData.data);
  } catch (error) {
    console.error('An error occurred:', error.message);
    alert('Oops! Something went wrong while fetching posts. Please try again later.');
  }
}

main();
