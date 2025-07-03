import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "", role: "Select"});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:5000/api/auth/login", form);
            const { token, user } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role);

            if(user.role === "admin"){
                navigate("/admin");
            } else{
                navigate("/dashboard");
            }
            alert("Login Successful.");
        } catch(err) {
            alert("Login Failed!");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <input onChange={handleChange} type="email" name="email" placeholder="Enter Email" value={form.email} 
                 className="w-full p-2 border rounded mb-3" required/>
                <input onChange={handleChange} type="password" name="password" placeholder='Password' value={form.password}
                 className="w-full p-2 border rounded mb-3" required />
                <select 
                 name="role"
                 value={form.role}
                 onChange={handleChange}
                 className="w-full p-2 border rounded mb-3"
                >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">Login</button>
            </form>
        </div>
    )
};

export default Login;