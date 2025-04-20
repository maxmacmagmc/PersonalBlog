import './App.css';
import { useState } from 'react';
import { NavBar } from './layout/NavBar';
import { HeroSection } from './layout/HeroSection';
import { Footer } from './layout/Footer';
import { ArticleSection } from './layout/ArticleSection';

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Highlight");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("likes"); // หรือ "date"

  return (
    <>
      <NavBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <HeroSection />
      <ArticleSection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <Footer />
    </>
  );
}

export default App;
