const express = require('express');
const app = express();
const userRouter = express.Router();
// Object to store the data of the user
let user = [];
app.use(express.json());
app.use('/user', userRouter);
// Home route
app.get('/', (req, res) => {
    res.send("Hello from the home route");
});
// Function to get users
let getUser = (req, res) => {
    if (user.length === 0) {
        return res.status(404).send("No user in the object");
    }
    res.status(200).send(user);
};
// Function to add a user
let addUser = (req, res) => {
    const { id, username, firstname, lastname, gender, age } = req.body;
    user.push({ id, username, firstname, lastname, gender, age });

    res.status(200).json({
        message: "User is successfully added",
        data: req.body
    });
};
// Function to update a user
let updateUser = (req, res) => {
    const { username, firstname, lastname, gender, age } = req.body;
    const index = user.findIndex((u) => u.username === username);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    user[index] = { ...user[index], firstname, lastname, username, gender, age };

    res.status(200).json({
        message: "User successfully updated",
        data: user[index]
    });
};
// Function to delete a user
let deleteUser = (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    const userIndex = user.findIndex(u => u.username === username);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = user.splice(userIndex, 1);

    res.status(200).json({
        message: "User successfully deleted",
        deletedUser: deletedUser[0]
    });
};
// Function to search a user by ID
let searchById = (req, res) => {
    const { id } = req.params;

    if (user.length === 0) {
        return res.send("The array is empty. Add some users to the array.");
    }

    const requestUser = user.filter(u => u.id == id);

    if (requestUser.length > 0) {
        res.json({
            message: "The user has been found",
            data: requestUser
        });
    } else {
        res.json({
            message: "No user found with that ID"
        });
    }
};
// Define routes for user operations
userRouter
    .route('/')
    .get(getUser)
    .post(addUser)
    .delete(deleteUser)
    .patch(updateUser);

userRouter
    .route('/:id')
    .get(searchById);  // Changed to GET for retrieving a user by ID

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
