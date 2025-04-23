// src/components/ui/SearchBox.jsx
import React from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBox({ search, setSearch, suggestions, onSelectSuggestion }) {
  
  const handleSelect = (item) => {
    setSearch(""); // เคลียร์ช่องค้นหา
    onSelectSuggestion(item); // แจ้งให้ LandingPage ทราบว่ามีการเลือก suggestion
  };

  return (
    <div className="w-full md:w-80 relative z-50">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by title, description..."
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-md z-50 rounded-md mt-1 max-h-60 overflow-auto">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <div className="font-medium">{item.title}</div>
              <div className="text-sm text-gray-500 truncate">{item.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}