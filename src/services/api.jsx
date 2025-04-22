export const API_URL = 'https://blog-post-project-api.vercel.app/posts';

export async function fetchPosts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}