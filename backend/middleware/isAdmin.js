module.exports = (req, res, next) =>{
    if(req.user?.role !== "admin"){
        console.log("🧪 User role in middleware:", req.user);
        return res.status(403).json({ error: "Access Denied!. Admins only."});
    }
    next();
};