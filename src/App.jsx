import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './layout/NavBar';
import { HeroSection } from './layout/HeroSection';
import { Footer } from './layout/Footer';
import ArticleSection from './layout/ArticleSection';
import PostDetailPage from './pages/PostDetailPage'; 
import NotFoundPage from './pages/NotFoundPage';
import  LoginPage  from './pages/LoginPage';
import  AdminPage  from './pages/AdminDashboard';  
import SignupPage from './pages/SignupPage';   

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Highlight");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("likes");

  return (
    <Router>
      <NavBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <ArticleSection
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
