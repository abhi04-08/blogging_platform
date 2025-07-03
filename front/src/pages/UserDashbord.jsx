import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashBoard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className=" min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 p-6 flex flex-col justify-center items-center">
            <h1 className=" text-4xl font-bold text-gray-800 mb-6">Welcome to the Blog Space</h1>
            <div className=" flex flex-wrap gap-6">
                <button onClick={() => navigate("/create")} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                    ➕ Create Blog
                </button>
                <button onClick={() => navigate("/blogs")} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                   📖 View all Blogs
                </button>
                <button onClick={() => navigate("/myblogs")} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                    👤 My Blogs
                </button>
                <button onClick={handleLogout}
                 className=" px-6 py-3 bg-red-600 text-black rounded-xl hover:bg-red-700">
                    Logout
                 </button>
            </div>
        </div>
    );
};

export default UserDashBoard;