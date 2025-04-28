import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';
import { Heart, Copy, Facebook, Linkedin, Twitter } from 'lucide-react';

const API_URL = 'https://blog-post-project-api.vercel.app/posts';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const isLoggedIn = false; // สมมติยังไม่ล็อกอิน

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!post) return <p className="text-center py-10">Loading...</p>;

  const handleLike = () => {
    if (!isLoggedIn) return alert('Please login to like');
    // logic like เพิ่มเติม...
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert('Link copied to clipboard!');
        toast.success('Link copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy link.');
        toast.error('Failed to copy link');
      });
  };

  const shareUrl = encodeURIComponent(window.location.href);

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8"> {/* ใช้ Grid Layout */}
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6 bg-white rounded-lg shadow p-6">
        {/* Title & Meta */}
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>

        {/* Image */}
        <img src={post.image} alt={post.title} className="w-full rounded" />

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between bg-gray-100 p-4 rounded-lg">
          {/* Like */}
          <button
            onClick={handleLike}
            className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-200"
          >
            <Heart className="w-5 h-5" /> {post.likes}
          </button>

          {/* Copy & Share */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-200"
            >
              <Copy className="w-5 h-5" /> Copy
            </button>
            <a
              href={`https://www.facebook.com/share.php?u=${shareUrl}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 border rounded-full hover:bg-gray-200"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 border rounded-full hover:bg-gray-200"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`https://twitter.com/share?&url=${shareUrl}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 border rounded-full hover:bg-gray-200"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="prose max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Comment Box */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Comment</h2>
          <textarea
            placeholder="What are your thoughts?"
            rows={4}
            className="w-full p-4 border rounded-lg resize-none"
            disabled={!isLoggedIn}
            onClick={() => !isLoggedIn && alert('Please login to comment')}
          />
          <button
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
            disabled={!isLoggedIn}
            onClick={() => {
              if (!isLoggedIn) return alert('Please login to comment');
              // logic submit comment...
            }}
          >
            Send
          </button>
        </div>
      </div>

      {/* Sticky Sidebar */}
      <aside className="hidden lg:block sticky top-20 h-fit bg-white rounded-xl shadow p-6">
        {/* เนื้อหา Sticky ของคุณ */}
        <div className="flex items-center mb-4">
          <img
            src="https://i.pravatar.cc/80?u=thompson.p" // แทนที่ด้วยรูปโปรไฟล์จริง
            alt="Thompson P."
            className="w-12 h-12 rounded-full object-cover mr-3"
          />
          <div>
            <h4 className="text-sm font-semibold text-gray-700">Author</h4>
            <p className="text-xs text-gray-500">Thompson P.</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          I am a pet enthusiast and freelance writer who specializes
          in animal behavior and care. With a deep love for cats, I
          enjoy sharing insights on feline companionship and wellness.
        </p>
        <p className="text-sm text-gray-600">
          When I'm not writing, I spend time volunteering at my local
          animal shelter, helping cats find loving homes.
        </p>
      </aside>
    </div>
  );
};

export default PostDetailPage;