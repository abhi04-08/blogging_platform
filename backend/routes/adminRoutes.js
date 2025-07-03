const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get("/stats", authMiddleware, isAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const blogs = await Blog.find();  // 👈 instead of count
        console.log("📊 Found total blogs:", blogs.length);
        const totalBlogs = blogs.length;
        const totalAdmins = await User.countDocuments({ role: "admin" });

        res.json({ totalUsers, totalBlogs, totalAdmins });
    } catch(err) {
        res.status(500).json({ error: "Falied to fetch the blog" });
    }
});
//Get all blogs
router.get("/blogs", authMiddleware, isAdmin, async (req, res) => {
    const blogs = await Blog.find().populate("author", "name email");
    res.json(blogs);
});

//Get all users
router.get("/users", authMiddleware, isAdmin, async(req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
});

//Delete blogs
router.delete("/blogs/:id", authMiddleware, isAdmin, async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted by Admin."});
});



module.exports = router;