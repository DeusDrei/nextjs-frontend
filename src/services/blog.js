export const getBlogs = async () => {
    const res = await fetch("http://localhost:5000/blogs");  
    const data = await res.json();
    return data.blogs;
  };
  
  export const createBlog = async (blogData) => {
    const res = await fetch("http://localhost:5000/create_blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });
    const data = await res.json();
    return data;
  };
  
  export const updateBlog = async (id, blogData) => {
    const res = await fetch(`http://localhost:5000/update_blog/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });
    const data = await res.json();
    return data;
  };
  
  export const deleteBlog = async (id) => {
    const res = await fetch(`http://localhost:5000/delete_blog/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  };
  