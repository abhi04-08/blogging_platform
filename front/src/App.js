import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "react-quill/dist/quill.snow.css";
import UserDashBoard from './pages/UserDashbord';
import AdminDashBoard from './pages/AdminDashBoard';
import MyBlogs from './pages/MyBlogs';
import EditBlog from './pages/EditBlog';
import BlogDetails from './pages/BlogDetails';
import BlogFeed from './pages/BlogFeed';
import CreateBlog from './pages/CreateBlog';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/create" element={<CreateBlog/>}></Route>
        <Route path="/blogs" element={<BlogFeed/>}></Route>
        <Route path="/dashboard" element={<UserDashBoard/>}></Route>
        <Route path="/blog/:id" element={<BlogDetails/>}></Route>
        <Route path="/edit/:id" element={<EditBlog/>}></Route>
        <Route path="/myblogs" element={<MyBlogs/>}></Route>
        <Route path="/admin" element={<AdminDashBoard/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;