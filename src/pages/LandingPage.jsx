// src/pages/LandingPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import SearchBox from "@/components/ui/SearchBox";
import { HeroSection } from "@/layout/HeroSection";

const API_URL = "https://blog-post-project-api.vercel.app/posts";

export default function LandingPage() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [category, setCategory] = useState("Highlight");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debounceTimer = useRef(null);

  const fetchArticles = async (reset = false) => {
    setLoading(true);
    setError(""); // Clear error
    try {
      const res = await axios.get(API_URL, {
        params: {
          page,
          limit: 6,
          category: category !== "Highlight" ? category : undefined,
          keyword: search || undefined,
        },
      });
      const fetched = res.data.posts.map(post => ({
        ...post,
        dateFormatted: format(new Date(post.date), "dd MMMM yyyy"),
      }));
      setArticles(reset ? fetched : [...articles, ...fetched]);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      setError("Cannot load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async (keyword) => {
    if (!keyword) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await axios.get(API_URL, { params: { keyword, limit: 10 } });
      setSuggestions(res.data.posts);
    } catch {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(search);
    }, 300);
    return () => clearTimeout(debounceTimer.current);
  }, [search]);

  useEffect(() => {
    setPage(1);
    fetchArticles(true);
    // eslint-disable-next-line
  }, [category, search]);

  useEffect(() => {
    if (page > 1) fetchArticles();
    // eslint-disable-next-line
  }, [page]);

  const handleSelectSuggestion = (item) => {
    setSearch("");
    setSuggestions([]);
    navigate(`/post/${item.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <HeroSection />

      {/* Filter & Search */}
      <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {["Highlight", "General", "Cat"].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
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

        <div className="relative z-50">
          <SearchBox
            search={search}
            setSearch={setSearch}
            suggestions={suggestions}
            onSelectSuggestion={handleSelectSuggestion}
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="text-center text-red-500 mb-4">
          {error}
        </div>
      )}

      {/* Empty */}
      {!error && articles.length === 0 && !loading && (
        <p className="text-center text-gray-500">No articles found.</p>
      )}

      {/* Loader */}
      {loading && (
        <div className="flex justify-center mt-6">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {articles.map(post => (
            <div
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
              className="bg-white rounded-xl shadow cursor-pointer hover:shadow-md transition overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-xs font-medium text-green-700 bg-green-100 rounded-full px-3 py-1">
                  {post.category}
                </span>
                <h3 className="mt-2 text-lg font-semibold line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {post.description}
                </p>

                {/* Avatar + Author */}
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://i.pravatar.cc/40?u=${post.author}`}
                      alt={post.author}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span>{post.author}</span>
                  </div>
                  <span>{post.dateFormatted}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* View More */}
      {!loading && !error && page < totalPages && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-700"
            onClick={() => setPage(p => p + 1)}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
}
