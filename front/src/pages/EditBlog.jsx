import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { useParams, useNavigate } from 'react-router-dom';
import "react-quill/dist/quill.snow.css";

const EditBlog = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({title: "", content: ""});

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
                setForm({ title: res.data.title, content: res.data.content});
            } catch(err) {
                alert("Error fetching the blog");
            }
        };
        fetchBlog();
    }, [id]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:5000/api/blogs/${id}`, form, {headers: { Authorization : `Bearer ${token}`}});
            alert("Blog updated successfully") ;
            navigate("/blogs");
        } catch(err) {
            alert("Falied to update the Blog.")
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Edit Blog</h1>
            <form onSubmit={handleSubmit} clasName="space-y-4">
                <input type="text" value={form.title} onChange ={(e) => setForm({...form, title: e.target.value})}
                 className="w-full p-2 rounded border" placeholder='title' required />
                < ReactQuill theme="snow" value={form.content} onChange={(value) => setForm({...form, content: value})} />
                <button type="submit" className="bg-blue-600 px-6 py-3 rounded-xl text-white hover:bg-blue-700">Update Blog</button>
            </form>
        </div>
    );
};

export default EditBlog;