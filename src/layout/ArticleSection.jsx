import React from "react";
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

const blogPosts = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/e739huvlalbfz9eynysc.jpg",
    category: "General",
    title: "The Art of Mindfulness: Finding Peace in a Busy World",
    description: "Discover the transformative power of mindfulness and how it can help you navigate the challenges of modern life with greater ease and contentment.",
    author: "Thompson P.",
    date: "11 September 2024",
    likes: 321,
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/gsutzgam24abrvgee9r4.jpg",
    category: "Cat",
    title: "The Secret Language of Cats: Decoding Feline Communication",
    description: "Unravel the mysteries of cat communication and learn how to better understand your feline friend's needs and desires.",
    author: "Thompson P.",
    date: "21 August 2024",
    likes: 123,
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/zzye4nxfm3pmh81z7hni.jpg",
    category: "Inspiration",
    title: "Embracing Change: How to Thrive in Times of Transition",
    description: "Learn powerful strategies to navigate life's changes with grace and emerge stronger on the other side.",
    author: "Thompson P.",
    date: "23 March 2024",
    likes: 21,
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/e0haxst38li4g8i0vpsr.jpg",
    category: "General",
    title: "The Future of Work: Adapting to a Digital-First Economy",
    description: "Explore how technology is reshaping the workplace and learn skills to succeed in the evolving job market.",
    author: "Thompson P.",
    date: "23 May 2024",
    likes: 32,
  },
  {
    id: 5,
    image: "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/g8qpepvgnz6gioylyhrz.jpg",
    category: "Inspiration",
    title: "The Power of Habits: Small Changes, Big Results",
    description: "Discover how small, consistent habits can lead to significant personal and professional growth over time.",
    author: "Thompson P.",
    date: "23 June 2024",
    likes: 515,
  },
  {
    id: 6,
    image: "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/koydfh6jpmzhtxvwein3.jpg",
    category: "Cat",
    title: "Cat Nutrition: A Guide to Feeding Your Feline Friend",
    description: "Learn about the nutritional needs of cats and how to provide a balanced diet for optimal health and longevity.",
    author: "Thompson P.",
    date: "21 July 2024",
    likes: 555,
  },
];

function ArticleSection() {
  return (
    <>
      <section className="flex flex-row items-center justify-between p-3 bg-gray-200">
        <div className="flex flex-row space-x-2 p-4 bg">
          <Button variant="default">Highlight</Button>
          <Button variant="default">Cat</Button>
          <Button variant="default">Inspiration</Button>
          <Button variant="default">General</Button>
        </div>
        <div className="flex flex-row space-x-2 p-4 ">
        <Input/>
          <Select>
            <SelectTrigger className="w-[160px] bg-white">
              <SelectValue placeholder="Highlight" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-8">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} {...post} authorImage="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" />
        ))}
      </div>
    </>
  );
}

export { ArticleSection };
