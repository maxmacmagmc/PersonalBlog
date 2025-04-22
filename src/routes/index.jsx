import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home';
import PostPage from '../pages/Post';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/post/:id" element={<PostPage />} />
    </Routes>
  );
}