const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cookieParser = require('cookie-parser')
const connectDB  = require('./Db/Db');
const userRouter = require('./Router/user.Router');
const authRoute = require('./Router/auth.router');
const app = express();
const PORT = process.env.PORT || 4001

connectDB();

app.use(cookieParser());
app.use(express.json());


app.use('/user',userRouter)
app.use('/auth',authRoute)



app.get('/',(req,res)=>{
    res.send("hello from the base")
})

app.get('/:id', (req, res) => {
    const {id} = req.params;
    res.send(`${id}`)
})


app.listen(PORT,()=>{
    console.log(`the server is running at ${PORT}`)
})
