import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getBlogs, updateBlog } from "../../services/blog";

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBlog, setEditedBlog] = useState({ title: "", content: "" });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        const blogs = await getBlogs();
        const blog = blogs.find((b) => b.id === parseInt(id));
        if (blog) {
          setBlog(blog);
          setEditedBlog({ title: blog.title, content: blog.content });
        }
      }
    };
    fetchBlog();
  }, [id]);

  const handleEdit = async () => {
    await updateBlog(id, editedBlog);
    setBlog({ ...blog, ...editedBlog });
    setIsEditing(false);
  };

  const handleBack = () => {
    router.push("/");
  };  

  return (
    <>
      {blog ? (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white transition-colors duration-300 p-6">
          <div className="w-full max-w-2xl bg-gray-800 text-white p-6 shadow-lg rounded-lg border border-gray-700">
            <button
              className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
              onClick={handleBack}
            >
              Back
            </button>

            <h1 className="text-3xl font-bold">{blog?.title}</h1>
            <p className="text-gray-400 text-sm">Author: {blog?.author}</p>
            <p className="text-gray-400 text-sm">
              Date: {blog ? new Date(blog.created_at).toLocaleDateString() : ""}
            </p>
            <p className="mt-4 text-gray-300">{blog?.content}</p>

            {isEditing ? (
              <div className="mt-6 p-4 bg-gray-700 border border-gray-600 rounded-lg">
                <h2 className="text-xl font-semibold">Edit Blog</h2>

                <label className="block mt-2">
                  <span className="text-gray-300">Title</span>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 border-gray-600 text-white"
                    value={editedBlog.title}
                    onChange={(e) => setEditedBlog({ ...editedBlog, title: e.target.value })}
                  />
                </label>

                <label className="block mt-2">
                  <span className="text-gray-300">Content</span>
                  <textarea
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 border-gray-600 text-white"
                    value={editedBlog.content}
                    onChange={(e) => setEditedBlog({ ...editedBlog, content: e.target.value })}
                  />
                </label>

                <div className="mt-4 flex gap-4">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    onClick={handleEdit}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <p className="text-lg text-gray-300">Loading...</p>
        </div>
      )}
    </>
  );
};

export default BlogDetail;
