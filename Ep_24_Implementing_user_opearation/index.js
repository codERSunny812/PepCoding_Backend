const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cookieParser = require('cookie-parser')
const connectDB  = require('./Db/Db');
const userRouter = require('./Router/user.Router');
const authRoute = require('./Router/auth.router');
const app = express();
const PORT = process.env.PORT || 4001
const authMiddleWare = require('./Middleware/auth.middleware')

connectDB();

app.use(cookieParser());
app.use(express.json());


app.use('/user',userRouter)
app.use('/auth',authRoute)



app.get('/',(req,res)=>{
    res.send("hello from the base")
})


// Protected Route
app.get("/protected",authMiddleWare, (req, res) => {
    res.status(200).json({ message: "You have access to this route!", user: req.user });
});



app.listen(PORT,()=>{
    console.log(`the server is running at ${PORT}`)
})
