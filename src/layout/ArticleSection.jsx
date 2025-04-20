import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BlogCard } from "./BlogCard";

const categories = ["Highlight", "Cat", "Inspiration", "General"];
const sortOptions = ["likes", "date"];
const BASE_URL = "https://blog-post-project-api.vercel.app/posts";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function ArticleSection() {
  const [initialPosts, setInitialPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Highlight");
  const [sortBy, setSortBy] = useState("likes");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Reset posts when category or search changes
  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
    setInitialPosts([]); // Reset posts on category or search change
    setPage(1);
    setHasMore(true);
  }, [selectedCategory, searchQuery]);

  // Fetch posts from API
  useEffect(() => {
    fetchPosts(page);
  }, [page, selectedCategory, searchQuery]);

  const fetchPosts = async (pageNum) => {
    setIsLoading(true);
    try {
      const res = await axios.get(BASE_URL, {
        params: {
          page: pageNum,
          limit: 6,
        },
      });
      const newPosts = res.data.posts.map((post) => ({
        ...post,
        date: formatDate(post.date),
      }));
      setInitialPosts((prev) => [...prev, ...newPosts]); // Append new posts to the existing ones
      setHasMore(res.data.nextPage !== null); // Check if there are more posts
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter, sort, search logic
  useEffect(() => {
    let filtered;

    if (selectedCategory === "Highlight") {
      const seenTitles = new Set();
      filtered = initialPosts.filter((post) => {
        if (seenTitles.has(post.title)) return false;
        seenTitles.add(post.title);
        return true;
      });
    } else {
      filtered = initialPosts.filter(
        (post) => post.category === selectedCategory
      );
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "likes") {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "date") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, sortBy, initialPosts]);

  const handleLoadMore = () => {
    if (hasMore) setPage((prev) => prev + 1); // Load next page
  };

  const renderSkeletons = (count = 6) => {
    return Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="animate-pulse space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md"
      >
        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-full" />
      </div>
    ));
  };

  return (
    <>
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 bg-gray-100 dark:bg-gray-800">
        <div className="hidden md:flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className={`${
                selectedCategory === category
                  ? "bg-gray-800 text-white dark:bg-white dark:text-black"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => setSelectedCategory(category)}
              disabled={selectedCategory === category}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:items-center w-full md:w-auto">
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64"
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[160px] bg-white dark:bg-gray-900 dark:text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="likes">Sort by Likes</SelectItem>
              <SelectItem value="date">Sort by Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex md:hidden">
          <Select
            value={selectedCategory}
            onValueChange={(val) => setSelectedCategory(val)}
          >
            <SelectTrigger className="w-full bg-white dark:bg-gray-900 dark:text-white mt-2">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-8">
        {isLoading && initialPosts.length === 0 ? (
          renderSkeletons(6)
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogCard
              key={post.id}
              {...post}
              showContent={true}
              authorImage="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            />
          ))
        ) : (
          <p className="text-center w-full col-span-2 text-gray-500 dark:text-gray-300">
            No articles found.
          </p>
        )}
      </div>

      {hasMore && (
        <div className="flex justify-center pb-8">
          <Button onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? "Loading..." : "View More"}
          </Button>
        </div>
      )}
    </>
  );
}

export { ArticleSection };
