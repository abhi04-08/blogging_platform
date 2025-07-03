import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchMyBlogs = async () => {
            if (!token) {
                console.log("❌ No token in localStorage");
                alert("You're not logged in.");
                return;
            }

            console.log("📤 Sending token:", token);
            try{
                const res = await axios.get("http://localhost:5000/api/blogs/myblogs", { headers: { Authorization : `Bearer ${token}`}});
                setBlogs(res.data);
            } catch(err) {
                console.error("❌ Failed to load blogs:", err.response?.data || err.message);
                alert("Failed to load your blogs");
            }
        };
        fetchMyBlogs();
    }, [token]);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 text-blue-600">My Blogs</h1>
            {blogs.length === 0 ? (
                <p>No Blogs yet. Try creating one! It will be fun.</p>
            ) : (
                blogs.map((blog) => (
                    <div key={blog._id} className="bg-white shadow p-4 rounded mb-4">
                        <h3 className="text-xl font-semibold">{blog.title}</h3>
                        <p className="text-gray-500 text-sm mb-4">
                            Posted on { new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                        <div className="text-gray-700 line-clamp-3" dangerouslySetInnerHTML={{__html: blog.content}}/>
                        <div className="flex gap=3 mt-3">
                            <button onClick={() => navigate(`/edit/${blog._id}`)}
                            className="bg-yellow-300 text-red-600 px-4 py-1 hover:bg-yellow-500">
                               ✏️ Edit
                            </button>
                            <button 
                               onClick={async () => {
                                const confirmDelete = window.confirm("Are you sure about deleting the blog?");
                                if(!confirmDelete) return;

                                try{
                                    await axios.delete(`http://localhost:5000/api/blogs/${blog._id}`, 
                                        { headers: {
                                            Authorization: `Bearer ${token}`
                                        }}
                                    );
                                    alert("Deleted successfully.");
                                    setBlogs(blogs.filter((b) => b._id !== blog._id));
                                }catch {
                                    alert("failed to delete the blog");
                                }
                               }}
                               className="bg-red-600 text-white px-4 py-1 hover:bg-red-700">
                             🗑 Delete
                            </button>
                        </div>
                    </div> 
                ))
            )}
        </div>
    );
};

export default MyBlogs;