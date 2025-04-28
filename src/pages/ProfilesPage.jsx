import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = 'http://localhost:4000';

export default function ProfilesPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/profiles`);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
        setError("Cannot load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-gray-500 text-lg">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* Sidebar */}
          <aside className="px-6 py-5 md:col-span-1 border-r border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-700">{profile?.name || 'User Profile'}</h2>
            </div>
            <div className="flex flex-col space-y-3">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 focus:outline-none focus:text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Profile</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 focus:outline-none focus:text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m-2 4a2 2 0 012 2m-7-2a2 2 0 012 2m-2-4a2 2 0 012 2" />
                </svg>
                <span>Reset Password</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="px-6 py-6 md:col-span-3">
            <h1 className="text-xl font-semibold text-gray-800 mb-5">Profile</h1>
            <div className="bg-white rounded-md shadow p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                  {/* You can insert the actual profile picture here */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none">Upload profile picture</button>
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={profile?.name || ''}
                  readOnly // Or you might want to allow users to edit
                />
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={profile?.username || ''}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={profile?.email || ''}
                  readOnly
                />
              </div>
              <div>
                <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Save
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}