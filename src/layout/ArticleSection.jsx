import React, { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import { format } from "date-fns";
import { Search } from "lucide-react";

const API_URL = "https://blog-post-project-api.vercel.app/posts";

const ArticleSection = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("Highlight");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchArticles = async (reset = false) => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL, {
        params: {
          page,
          limit: 6,
          category: category !== "Highlight" ? category : undefined,
          keyword: search || undefined,
        },
      });

      const fetched = res.data.posts.map((post) => ({
        ...post,
        dateFormatted: format(new Date(post.date), "dd MMMM yyyy"),
      }));

      setArticles((prev) => (reset ? fetched : [...prev, ...fetched]));
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching articles", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchArticles(true);
  }, [category, search]);

  useEffect(() => {
    if (page !== 1) fetchArticles();
  }, [page]);

  const handleViewMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleSearch = () => {
    setPage(1);
    fetchArticles(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Category and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        {/* Category Buttons */}
        <div className="flex gap-2 flex-wrap">
          {["Highlight", "Cat", "Inspiration", "General"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === cat
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 bg-white w-full md:w-80">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            Go
          </button>
        </div>
      </div>

      {/* Article Grid */}
      {articles.length === 0 && !loading && (
        <p className="text-center text-gray-500">No articles found.</p>
      )}

<div className="grid gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">

        {articles.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>

      {/* Loading & View More */}
      {loading && <p className="text-center mt-6 text-gray-500">Loading...</p>}

      {!loading && page < totalPages && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleViewMore}
            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-700"
          >
            View More
          </button>
        </div>
      )}
    </section>
  );
};

export default ArticleSection;
