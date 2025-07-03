const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async(req, res) => {
    const { name, email, password } = req.body;
    console.log("Received Register Body:", req.body); 
    if (!name || !email || !password) {
        console.log("Missing fields.")
        return res.status(400).json({ error: "All fields are required." });
    }
    try{
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log("Email already registered.")
            return res.status(400).json({ error: "Email already registered." });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed});
        res.status(201).json(user);
    } catch(err) {
        console.error("Registration error", err);
        res.status(400).json({error:"Email already exists or invalid data."});
    }
};

exports.login = async(req, res) => {
    const { email, password, role } = req.body;
    console.log("🧪 JWT_SECRET value:", process.env.JWT_SECRET);

    try{

        //Admin user login
        if(role === "admin"){
            if (
                email === process.env.ADMIN_EMAIL &&
                password === process.env.ADMIN_PASSWORD
            ) {
                const token = jwt.sign(
                    { id: "adminId", role: "admin"},
                    process.env.JWT_SECRET,
                    { expiresIn : '7d'}
                );
                return res.json({ token, user: { id: "adminId", name: "Admin", role: "admin" },
                });
            } else {
                return res.status(401).json({ error: "Invalid Admin credentials."});
            }
        }

        //Normal user login
        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({error: "User not found."});

        const matched = await bcrypt.compare(password, user.password);
        if(!matched) return res.status(401).json({error: "Invalid Credentials."});

        const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.json({token, user: {id: user._id, name: user.name, role: user.role}});
    } catch(err) {
        console.log("❌ Login error:", err.message);
        res.status(500).json({error:"Server error."});
    }
};
