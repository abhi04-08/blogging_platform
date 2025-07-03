const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;
    console.log("📦 Authorization Header:", req.headers.authorization);

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        console.log("❌ No or invalid token format");
        return res.status(401).json({error: "Access Denied! No Token provided."});
    }
    
    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("🔐 Authenticated user:", req.user);
        console.log("🔐 Authenticated user payload:", decoded);
        next();
    } catch(err) {
        console.log("❌ Token verification failed:", err.message);
        res.status(401).json({ error: "Invalid Token."});
    }
};

module.exports = authMiddleware;