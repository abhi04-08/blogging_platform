import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: ""});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            console.log("Sending form:", form);
            const res = await axios.post("http://localhost:5000/api/auth/register", form);
            console.log("Registered", res.data);
            alert("Registration is successful.");
            navigate("/login");
        } catch(err) {
            console.error("Registartion failed:", err.response?.data || err);
            alert("Registration Failed.");
        }
    };

    return(
        <div className='min-h-screen flex justify-center items-center bg-gray-100'>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Register Now!!</h2>
                <input type='text' name="name" placeholder="Enter Name" value={form.name} onChange={handleChange}
                 className="w-full p-2 border mb-3 rounded" required />
                <input type="email" name="email" placeholder="Enter Email" value={form.email} onChange={handleChange}
                 className="w-full p-2 border mb-3 rounded" required />
                <input type="password" name="password" placeholder="Enter Password" value={form.password} onChange={handleChange}
                 className="w-full p-2 border mb-3 rounded" required />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">Register</button>
            </form>
        </div>
    );
};

export default Register;