const express = require('express');
const { update } = require('lodash');


const app = express()

app.use(express.json())

//object to store the data of the user
let user = []

app.get('/',(req,res)=>{
    res.send("server is running")
})


// methods in http 

// 1. GET

app.get('/get-user',(req,res)=>{
    if(user.length == 0){
        res.status(404).send("No user in the object")
    }
    res.status(200).send(user);
})



// 2. POST 
app.post('/add-user',(req,res)=>{
// extracting the user data from the  request:
const {username , firstname , lastname , gender , age } = req.body
//new user is pushed to the arrray
user.push({
    username:username,
    firstname:firstname,
    lastname:lastname,
    gender:gender,
    age:age
})

res.status(200).json({
    message:"user is successfully added",
    data:req.body
})
})


app.patch('/update-user',(req,res)=>{
    const {username , firstname , lastname , gender , age} = req.body;

    // check for the data in the array 
    const index = user.findIndex((u)=> u.username == username)

    if(index == -1){
        return res.status(404).json({ message: "User not found" });
    }

    // update the user 
    user[index]={
        ...user[index],
        firstname:firstname,
        lastname:lastname,
        username:username,
        gender:gender,
        age:age
    }

    res.status(200).json({
        message: "User successfully updated",
        data: user[userIndex]
    });
})


//4.  DELETE user
app.delete('/delete-user', (req, res) => {
    const { username } = req.body;

    // Check if the username is provided
    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    // Find the user by username
    const userIndex = user.findIndex(u => u.username === username);

    // Check if the user exists
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    // Remove the user from the array
    const deletedUser = user.splice(userIndex, 1);

    res.status(200).json({
        message: "User successfully deleted",
        deletedUser: deletedUser[0]
    });
});


app.listen(3000,()=>{
    console.log("the server is running at the port 3000")
})