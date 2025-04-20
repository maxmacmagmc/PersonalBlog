import React, { useState, useEffect } from "react";
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
import { blogPosts as initialPosts } from "@/data/blogPosts";

const categories = ["Highlight", "Cat", "Inspiration", "General"];
const sortOptions = ["likes", "date"];

function ArticleSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("likes");
  const [selectedCategory, setSelectedCategory] = useState("Highlight");
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Load selected category from localStorage on first render
  useEffect(() => {
    const storedCategory = localStorage.getItem("selectedCategory");
    if (storedCategory) {
      setSelectedCategory(storedCategory);
    }
  }, []);

  // Save selected category to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    let filtered = initialPosts.filter((post) =>
      selectedCategory === "Highlight" ? true : post.category === selectedCategory
    );

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
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <>
      {/* Filter bar */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 bg-gray-100">
        {/* Filter buttons (Desktop only) */}
        <div className="hidden md:flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className={`${
                selectedCategory === category
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(category)}
              disabled={selectedCategory === category}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Search and Sort (All screens) */}
        <div className="flex flex-col md:flex-row gap-2 md:items-center md:ml-auto w-full md:w-auto">
          <Input
            placeholder="Search articles..."
            className="w-full md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[160px] bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="likes">Sort by Likes</SelectItem>
              <SelectItem value="date">Sort by Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Dropdown (Mobile only) */}
        <div className="flex md:hidden">
          <Select
            value={selectedCategory}
            onValueChange={(val) => setSelectedCategory(val)}
          >
            <SelectTrigger className="w-full bg-white mt-2">
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

      {/* Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-8">
        {filteredPosts.map((post) => (
          <BlogCard
            key={post.id}
            {...post}
            authorImage="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            showContent={true}
          />
        ))}
      </div>
    </>
  );
}

export { ArticleSection };
