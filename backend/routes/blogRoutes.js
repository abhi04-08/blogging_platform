const express = require("express");
const router = express.Router();
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getUserBlogs } = require('../controllers/blogController')
const authMiddleware = require('../middleware/authMiddleware');

router.post("/", authMiddleware, createBlog); //protected
router.get("/myblogs", authMiddleware, getUserBlogs);
router.get("/", getAllBlogs); //public
router.get("/:id", getBlogById);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);


module.exports = router;