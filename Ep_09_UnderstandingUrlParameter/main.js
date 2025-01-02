const express = require('express')
const app = express()




//object to store the data of the user
let user = []

app.use(express.json())

//home  route 
app.get('/',(req,res)=>{
    res.send("hello from the home route")
})



// methods in http 

// 1. GET

app.get('/get-user', (req, res) => {
    if (user.length == 0) {
        res.status(404).send("No user in the object")
    }
    res.status(200).send(user);
})



// 2. POST 
app.post('/add-user', (req, res) => {
    // extracting the user data from the  request:
    const { id,username, firstname, lastname, gender, age } = req.body
    //new user is pushed to the arrray
    user.push({
        id:id,
        username: username,
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        age: age
    })

    res.status(200).json({
        message: "user is successfully added",
        data: req.body
    })
})


app.patch('/update-user', (req, res) => {
    const { username, firstname, lastname, gender, age } = req.body;

    // check for the data in the array 
    const index = user.findIndex((u) => u.username == username)

    if (index == -1) {
        return res.status(404).json({ message: "User not found" });
    }

    // update the user 
    user[index] = {
        ...user[index],
        firstname: firstname,
        lastname: lastname,
        username: username,
        gender: gender,
        age: age
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


//dynamic request
app.get('/username/:username',(req,res)=>{
    const {username} = req.params;

    console.log(`A user with the name ${username} has visited our server`);

    res.json({
        message:"a user has visited our server",
        name:username
    })
})


//filter out the data of the user using  params
app.post('/get-data-by-id/:id',(req,res)=>{
    const {id}=req.params;
    //search in the array 

    // check the array is empty or not
    if(user.length == 0){
        res.send("the array is empty add some users to the array")
    }

    const requestUser = user.filter(({id})=>{
        return id == req.params.id;

    })


    if(requestUser){
        res.json({
            message:"the user has been found",
            data:requestUser
        })
    }else{
        res.json({
            message:"no user have been found with that id"
        })
    }
})


// filter the data using the quaries 
app.post('/get-data-by-username',(req,res)=>{
    const {username} = req.query;

    // check the array is empty or not
    if (user.length == 0) {
        res.send("the array is empty add some users to the array")
    }

    const requestUser = user.filter((u) => {
        return u.username == username ;

    })


    if (requestUser) {
        res.json({
            message: "the user has been found",
            data: requestUser
        })
    } else {
        res.json({
            message: "no user have been found with that username"
        })
    }


})





app.listen(3001,()=>{
    console.log("server is running")
})






