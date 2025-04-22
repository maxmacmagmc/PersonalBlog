import React from "react";
import { Calendar } from "lucide-react";

const ArticleCard = ({ post }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all flex flex-col h-full">
      {/* รูปภาพด้านบน */}
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-60 object-cover" // เดิม h-48 → h-60
      />

      {/* เนื้อหา */}
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-sm font-semibold text-green-700 bg-green-100 rounded-full px-4 py-1 w-fit mb-3">
          {post.category}
        </span>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-base text-gray-700 line-clamp-3 mb-6">
          {post.description}
        </p>

        {/* Author & Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
          <div className="flex items-center gap-2">
            <img
              src={post.authorAvatar || "https://i.pravatar.cc/150?u=" + post.author}
              alt={post.author}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{post.dateFormatted}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
