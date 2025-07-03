import React , { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogFeed = () => {
    const [blogs, setBlogs] = useState([]);
    const [category, setCategory] = useState("");

    const filteredBlogs = category ? blogs.filter((b) => b.category === category) : blogs;
    
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/blogs");
                setBlogs(res.data);
            } catch(err) {
                console.error("Error fetching blogs.", err);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className=" min-h-screen bg-gray-100 p-6 ">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">Blog Feed</h1>
            <div className="mb-6 text-center">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
                    <option value="">All Categories</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Education">Education</option>
                    <option value="Travel">Travel</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogs.map((blog) => (
                    <div key={blog._id} className=" bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl fot-semibold mb-2">{blog.title}</h2>
                        <p className=" text-sm text-gray-500 mb-4 ">
                            By {blog.author?.name || "Unknown"} . {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                        <div className=" text-gray-700 mb-4 line-clamp-3" 
                         dangerouslySetInnerHTML={{__html: blog.content}} />
                        <Link to={`/blog/${blog._id}`}
                         className=" inline-block text-blue-600 hover:underline font-medium"> Read more</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogFeed;