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

  // Debounce timer ref
  const debounceTimer = useRef(null);
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
      const fetched = res.data.posts.map(post => ({
        ...post,
        dateFormatted: format(new Date(post.date), "dd MMMM yyyy"),
      }));
      setArticles(reset ? fetched : [...articles, ...fetched]);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
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
      console.log("Data from fetchSuggestions:", res.data.posts);
      setSuggestions(res.data.posts);
      console.log("Suggestions state after update:", suggestions);
    } catch {
      setSuggestions([]);
    }
  };

  // Debounced search for suggestions
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      console.log("Fetching suggestions for:", search);
      fetchSuggestions(search);
    }, 300); // หน่วง 300ms
    return () => clearTimeout(debounceTimer.current);
  }, [search]);

  // Fetch articles on filter change
  useEffect(() => {
    setPage(1);
    fetchArticles(true);
    // eslint-disable-next-line
  }, [category, search]);

  // Fetch more on page change
  useEffect(() => {
    if (page > 1) fetchArticles();
    // eslint-disable-next-line
  }, [page]);

  const handleSelectSuggestion = (item) => {
    setSearch(""); // Clear search input
    setSuggestions([]); // Clear suggestions
    navigate(`/post/${item.id}`);
  };

 

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <HeroSection />
      {/* Filter & Search */}
      <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        {/* Categories */}
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

        {/* Search */}
        <div className="relative z-50">
          <SearchBox
            search={search}
            setSearch={setSearch}
            suggestions={suggestions}
            onSelectSuggestion={handleSelectSuggestion}
          />
        </div>
      </div>

      {/* Grid */}
      {articles.length === 0 && !loading && (
        <p className="text-center text-gray-500">No articles found.</p>
      )}
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
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>{post.author}</span>
                <span>{post.dateFormatted}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More */}
      {loading && <p className="text-center mt-6">Loading...</p>}
      {!loading && page < totalPages && (
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