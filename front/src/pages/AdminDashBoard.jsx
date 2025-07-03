import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashBoard = () => {
    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async() => {
            try {
                const [blogRes, userRes, statsRes] = await Promise.all([
                    axios.get("http://localhost:5000/api/admin/blogs", { headers: { Authorization : `Bearer ${token}`}}),
                    axios.get("http://localhost:5000/api/admin/users", { headers: { Authorization : `Bearer ${token}`}}),
                    axios.get("http://localhost:5000/api/admin/stats", { headers: { Authorization : `Bearer ${token}`}}),
                ]);
                setBlogs(blogRes.data);
                setUsers(userRes.data);
                setStats(statsRes.data);
            } catch(err) {
                alert("Access Denied. You are not an admin.");
                navigate("/");
            }
        };
        fetchData();
    }, [navigate, token]);

    const deleteBlog = async(id) => {
        if(!window.confirm("Are you sure to delete this blog?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/admin/blogs/${id}`, { headers: { Authorization: `Bearer ${token}`}});
            setBlogs(blogs.filter((b) => b._id !== id));
        } catch {
            alert("Failed to delete the blog.");
        }
    };


    return (
        <div className=" max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">Welcome Admin!!</h1>
                <button onClick={() => navigate("/login")} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Logout</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 shadow rounded text-center">
                    <h3 className="text-xl font-semibold text-gray-700">👥 Users</h3>
                    <p className="text-3xl font-bold text-blue-500">{stats.totalUsers}</p>
                </div>
                <div className="bg-white p-4 shadow rounded text-center">
                    <h3 className="text-xl font-semibold text-gray-700">📝 Blogs</h3>
                    <p className="text-3xl font-bold text-blue-500">{stats.totalBlogs}</p>
                </div>
                <div className="bg-white p-4 shadow rounded text-center">
                    <h3 className="text-xl font-semibold text-gray-700">🛡️ Admins</h3>
                    <p className="text-3xl font-bold text-blue-500">{stats.totalAdmins}</p>
                </div>
            </div>
            <div className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">All Blogs</h2>
                {blogs.length === 0 ? (
                    <p>No Blogs yet.</p>
                ): (
                    blogs.map((blog) => (
                        <div key={blog._id} className="bg-white rounded shadow p-4 mb-4">
                            <h3 className="text-lg font-bold">{blog.title}</h3>
                            <p className="text-sm text-gray-500">
                                By {blog.author?.name || "Unknown"} ({blog.author?.email}) - {new Date(blog.createdAt).toLocaleDateString()}
                            </p>
                            <div className="mt-2 flex justify-between">
                                <button onClick={() => deleteBlog(blog._id)} className="bg-red-600 text-white rounded-xl px-3 py-1 hover:bg-red-700">
                                    Delete Blog
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-600 mb-2">All Users</h2>
                {users.length === 0? (
                    <p> No users found</p>
                ) : (
                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className=" p-2 border">Name</th>
                                <th className=" p-2 border">Email</th>
                                <th className=" p-2 border">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="text-center">
                                    <td className="p-2 border">{user.name}</td>
                                    <td className="p-2 border">{user.email}</td>
                                    <td className="p-2 border">
                                        <span className={`px-2 py-1 rounded text-white text-sm ${user.role === "admin" ? "bg-red-600" : "bg-blue-600"}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminDashBoard;