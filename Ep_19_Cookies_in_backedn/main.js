const express = require('express');
const connectDb = require('./DB/Db');
const app = express();
const userModel = require('./models/userModel')
const cookieParser = require('cookie-parser')

connectDb();

app.use(cookieParser());

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



// route to set up the cookies
app.get('/set-cookie', (req, res) => {
    // Set a cookie with key 'username' and value 'Sushil'
    res.cookie('username', 'Sushil Pandey', {
        maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time: 1 day
        httpOnly: true, // Cookie cannot be accessed by JavaScript (for security)
        secure: false,  // Set true if using HTTPS
        sameSite: 'Lax' // Protect against CSRF attacks
    });
    res.send('Cookie has been set!');

})


// Route to read a cookie
app.get('/get-cookie', (req, res) => {
    console.log(req.cookies);
    const username = req.cookies.username; // Access the 'username' cookie
    if (username) {
        res.send(`Hello, ${username}! Your cookie was read.`);
    } else {
        res.send('No cookies found.');
    }
});


// Route to delete a cookie
app.get('/delete-cookie', (req, res) => {
    res.clearCookie('username'); // Clear the 'username' cookie
    res.send('Cookie has been deleted!');
});








app.listen(3000, () => {
    console.log("server is  running")
})