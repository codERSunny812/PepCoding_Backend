const express = require('express');
const morgan = require('morgan');
const app = express();

const userRouter = express.Router();

// third party middleware
app.use(morgan('dev')); // Logs all incoming requests in the 'dev' format

// built in middleware

app.use(express.json()); // Parses JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data


// Application-level middleware
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next(); // Pass control to the next middleware, if not used then the program can exit from this and stuck here
    
});

app.get('/', (req, res) => {
    console.log("home route")
    res.send("home route")
})

app.post('/submit', (req, res) => {
    console.log(req.body); // Access parsed body data
    res.send('Data received');
});


// Router level middleware

// Middleware applied only to routes in `userRouter`
userRouter.use((req, res, next) => {
    console.log('Middleware for /user routes');
    next();
});

userRouter.get('/', (req, res) => {
    res.send('User home page');
});

userRouter.get('/profile', (req, res) => {
    res.send('User profile page');
});

app.use('/user', userRouter);

// error handling middlware must include all the four parameter
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.get('/error', (req, res) => {
    throw new Error('Intentional error!');
});








app.listen(3001,()=>{
    console.log("server is running")
})