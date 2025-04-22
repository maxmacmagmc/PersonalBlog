import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://blog-post-project-api.vercel.app/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!post) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{post.date}</p>
      <img src={post.image} alt={post.title} className="w-full mb-4 rounded" />
      <p className="text-lg leading-relaxed">{post.content}</p>
    </div>
  );
};

export default PostDetailPage;
