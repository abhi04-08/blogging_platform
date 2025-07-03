const Blog = require('../models/Blog');
const mongoose = require('mongoose');

exports.createBlog = async (req, res) => {
    const { title, content } = req.body;
    try {
        const blog = await Blog.create({
            title, content, author: req.user.id
        });
        res.status(201).json(blog);
    }catch(err) {
        res.status(401).json({ error: "Failed to create blog. "});
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "name").sort({ createdAt : -1});
        res.json(blogs);
    } catch(err) {
        res.status(500).json({ error: "Server error, Failed to fetch blogs "});
    }
};

exports.getBlogById = async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id).populate("author", "name");
        if(!blog) res.status(401).json({ error: " Blog not found. "});
        res.json(blog);
    } catch(err) {
        res.status(500).json({ error: " Server error"});
    }
};

exports.updateBlog = async(req, res) => {
    try {
        console.log("✏️ Updating blog with ID:", req.params.id);
        console.log("📝 New Data:", req.body);

        const blog = await Blog.findById(req.params.id);
        if(!blog) {
            console.log("Blog not found");
            res.status(404).json({ error: "Blog not found"});
        }

        if (blog.author.toString() != req.user.id)
            return res.status(403).json({ error: "Invalid author"});

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        await blog.save();

        res.json(blog);
    } catch(err) {
        console.error("❌ Error updating blog:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if(!blog) res.status(404).json({ error: "Blog not found" });

        if(blog.author.toString() != req.user.id)
            return res.status(403).json({ error: "Invalid author." });

        await blog.deleteOne();
        res.json({ message: "Blog deleted successfully." });
    } catch(err) {
        res.status(500).json({ error: "Delete failed" });
    }
};

exports.getUserBlogs = async (req, res) => {
    try{
        console.log("🔍 [MyBlogs] Request from user:", req.user);

        if (!req.user || !req.user.id) {
            console.log("❌ req.user is undefined");
            return res.status(401).json({ error: "Unauthorized" });
        }

        const userId = new mongoose.Types.ObjectId(req.user.id);
        console.log("🔎 Converted to ObjectId:", userId);


        const blogs = await Blog.find({ author:userId }).sort({ createdAt: -1 });
        console.log("✅ Found blogs:", blogs.length);
        res.json(blogs);
    } catch(err) {
        console.error("❌ Error fetching user blogs:", err);
        res.status(500).json({ error: "Failed to fetch blogs." });
    }
};