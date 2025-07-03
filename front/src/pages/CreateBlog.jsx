import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            console.log("Token:", token);
            await axios.post("http://localhost:5000/api/blogs",
            { title, content }, 
            { 
                headers: { 
                    Authorization: `Bearer ${token}`,
                },
            }
        );
            alert("Blog posted successfully.");
            setTitle("");
            setContent("");    
        } catch(err) {
            alert("Failed to post Blog.");
        }
    };

    return (
        <div className='max-w-4xl mx-auto p-6 mt-10'>
            <h2 className="text-3xl font-bold mb-4">Create a New Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Enter the blog title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required/>
                <ReactQuill theme='snow' value={content} onChange={setContent} />
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Post Blog</button>
            </form> 
        </div>
    );
};

export default CreateBlog;