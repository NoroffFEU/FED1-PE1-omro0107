const API_BASE_URL = 'https://v2.api.noroff.dev';

export const API_BLOG_URL = `${API_BASE_URL}/blog/posts/<name>`; // applies to both blog (all posts) and create post.
export const API_POST_URL = `${API_BASE_URL}/blog/posts/<name>/<id>`; // applies to both single post, update post and delete post.