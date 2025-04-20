import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogCard } from "./BlogCard";
import { Input } from "@/components/ui/input";
import { blogPosts as allPosts } from "@/data/blogPosts";

function ArticleSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Default");
  const [filteredPosts, setFilteredPosts] = useState(allPosts);

  useEffect(() => {
    let filtered = [...allPosts];

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Filter by search keyword
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by selected option
    if (sortOption === "Most Liked") {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (sortOption === "Newest") {
      filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, sortOption]);

  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-between p-3 bg-gray-200 gap-4">
        <div className="flex flex-row flex-wrap gap-2">
          {["All", "Highlight", "Cat", "Inspiration", "General"].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="flex flex-row space-x-2 p-2">
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white"
          />


          <Select onValueChange={(val) => setSortOption(val)} defaultValue="Default">
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Default">Default</SelectItem>
              <SelectItem value="Most Liked">Most Liked</SelectItem>
              <SelectItem value="Newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogCard
              key={post.id}
              {...post}
              authorImage="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            />
          ))
        ) : (
          <p className="text-center col-span-2 text-gray-500">No articles found.</p>
        )}
      </div>
    </>
  );
}

export { ArticleSection };
