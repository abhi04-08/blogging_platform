import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from blue-100 via-purple-100 to-pink-100 p-4">
            <h1 className="text-5xl md:text-6xl text-gray-800 font-bold mb-6 drop-shadow-md"> Welcome to BlogVerse</h1>
            <p className="text-gray-600 text-center max-w-md mb-8 text-lg">
                Your own blogging space where you can share your thoughts, imspire others and connwct with like-minded people
            </p>
            <div className="flex gap-6">
                <button onClick={() => navigate('/register')}
                 className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg transition duration-300">
                    Register
                 </button>
                <button onClick={() => navigate('/login')}
                 className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg transition duration-300">
                    Login
                 </button>
            </div>
        </div>
    );
}