const express = require('express');
const connectDb = require('./DB/Db');
const app = express();
const userModel = require('./models/userModel')

connectDb();

app.use(express.json()); //important

app.get('/', (req, res) => {
    res.send('home route')
})

//create of user in DB
app.post('/users', async (req, res) => {
    try {
        const user = await userModel.create(req.body);
        res.status(201).json({
            message: 'User created successfully',
            data: user,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a specific user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//delete of the user 
app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'User deleted successfully',
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Partial Update (PATCH)
app.patch('/users/:id', async (req, res) => {
    try {
        // Find the document by ID and update only the fields provided in req.body
        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Use $set to update only the fields specified
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});











app.listen(3000, () => {
    console.log("server is  running")
})