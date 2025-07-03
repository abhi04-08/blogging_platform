import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BlogDetails = () => {
    const {id} = useParams();
    const [blog, setBlog] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBlogs = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
                setBlog(res.data);
            } catch(err) {
                console.error("Error loading the blog.", err);
            }
        };
        fetchBlogs();
    }, [id]);

    if(!blog) return <p className="text-center text-pink-600 mt-10">Loading........</p>

    const isAuthor = token && blog.author?._id && isCurrentUser(blog.author._id);

    function isCurrentUser(authorId) {
        try {
            const tokenPayLoad = JSON.parse(atob(token.split(".")[1]));
            return tokenPayLoad.id === authorId;
        } catch(err) {
            return false;
        }
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete the blog?");
        if(!confirmDelete) return;
        try {
            await axios.delete(`http://localhost:5000/api/blogs/${id}`, { headers: { Authorization: `Bearer ${token}`}});
            alert("Blog deleted.");
            navigate("/blogs");
        } catch(err) {
            alert("Delete failed.");
        }
    };
    
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
            <p className=" text-gray-600 text-sm mb-4">
                By {blog.author?.name} . {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <div className="prose prose-lg text-gray-800"
             dangerouslySetInnerHTML={{ __html: blog.content}} />

            {isAuthor && (
                <div className="mt-6 flex gap-4">
                    <button onClick={() => navigate(`/edit/${blog._id}`)} 
                     className= "bg-yellow-500 px-6 py-3 text-white rounded-xl hover:bg-yellow-600">
                        ✏️ Edit Blog
                     </button>
                    <button onClick={handleDelete} 
                     className=" bg-red-600 text-black rounded-xl px-6 py-3 hover:bg-red-700">
                        🗑 Delete
                     </button>
                </div>
            )}
        </div>
    );
};

export default BlogDetails;