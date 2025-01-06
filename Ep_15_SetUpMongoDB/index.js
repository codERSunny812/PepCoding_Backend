const express = require('express');
const connectDb = require('./DB/Db');
const userModel = require('./Model/UserModel');
const app = express();

connectDb();

app.use(express.json()); //important

app.get('/',(req,res)=>{
    res.send('home route')
})

app.get('/user',(req,res)=>{
    res.send("hello from the user  route");
})
app.post('/user',async(req,res)=>{
const user = req.body;
console.log(user);

let createdUser = await userModel.create(user);

res.json({
    message:"a new user is created in the db",
    data:createdUser
})
})








app.listen(3000,()=>{
    console.log("server is  running")
})