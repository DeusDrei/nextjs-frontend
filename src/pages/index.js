import React, { useState, useEffect } from "react";
import { getBlogs, createBlog, deleteBlog } from "../services/blog";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", content: "" });

  useEffect(() => {
    document.documentElement.classList.add("dark"); 
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await getBlogs();
      setBlogs(fetchedBlogs);
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const result = confirm("Are you sure you want to delete this blog?");
    if (result) {
      await deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  const handleCreate = async () => {
    const response = await createBlog(newBlog);
    setBlogs([...blogs, response.blog]);
    setShowCreateModal(false);
    setNewBlog({ title: "", author: "", content: "" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white transition-colors duration-300 p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>

      <button
        className="mb-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        onClick={() => setShowCreateModal(true)}
      >
        Create Blog
      </button>

      <div className="w-full max-w-3xl">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-800 text-white shadow-lg rounded-lg p-6 mb-6 border border-gray-700"
          >
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-gray-400">Author: {blog.author}</p>
            <p className="text-gray-500 text-sm">
              Date: {new Date(blog.created_at).toLocaleDateString()}
            </p>
            <div className="mt-4 flex gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                onClick={() => handleDelete(blog.id)}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
                onClick={() => (window.location.href = `/blogs/${blog.id}`)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Blog</h2>

            <label className="block mb-2">
              <span className="text-gray-300">Title</span>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 border-gray-600 text-white"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              />
            </label>

            <label className="block mb-2">
              <span className="text-gray-300">Author</span>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 border-gray-600 text-white"
                value={newBlog.author}
                onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-300">Content</span>
              <textarea
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 border-gray-600 text-white"
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
              />
            </label>

            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                onClick={handleCreate}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
