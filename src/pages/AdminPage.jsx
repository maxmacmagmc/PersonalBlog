import React from 'react';

function AdminPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-700">Welcome to the admin panel. Here you can manage posts, users, and more.</p>
      {/* ตัวอย่าง: ตารางบทความ, ปุ่มเพิ่มบทความ ฯลฯ */}
      <div className="mt-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Articles</h2>
        <p className="text-gray-500">(Example admin content goes here...)</p>
      </div>
    </div>
  );
}

export default AdminPage;
