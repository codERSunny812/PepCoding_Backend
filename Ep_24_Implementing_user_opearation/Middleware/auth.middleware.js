const jwt = require('jsonwebtoken')

const SECRET_KEY="this is the secret  key"

const authMiddleWare =(req,res,next,err)=>{
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token)

    if (!token) {
        return res.status(401).json({ message: "Token is required" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach user data to the request object
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
}


module.exports=authMiddleWare