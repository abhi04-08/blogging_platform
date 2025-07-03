const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: {
        type: [String],
        default: [],
    },
    comments: [
        {
        text: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
        createdAt: { type: Date, default: Date.now},
    },
],
    category: {
        type: String,
        default: "General",
    },
    imageUrl: {
        type: String,
        default: "",
    },
}, { timestamps: true});

module.exports = mongoose.model("Blog", blogSchema);