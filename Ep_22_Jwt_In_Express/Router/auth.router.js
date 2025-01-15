const express = require("express");
const authRoute = express.Router();
const userModel = require("../Model/user.modal");
const jwt = require('jsonwebtoken')

const SECRET_KEY="this is the secret key"

const createUser = async (req, res) => {
  const { name, email, age, password } = req.body;

  if (!name || !email || !age || !password) {
    res.status(400).json({
      message: "the data is not completed",
    });
  }

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }
      // Create a new user
      const newUser = await userModel.create({
          name,
          email,
          age,
          password
      });

      res.status(201).json({
          message: 'User created successfully',
          data: newUser,
      });
  } catch (error) {
      res.status(500).json({
          message: 'An error occurred during signup',
          error: error.message,
      });
  
  }
};

// login api end point
const loginUser = async(req,res)=>{
    const { email, password } = req.body;


    // Check if both fields are provided
    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required',
        });
    }
try {
    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }

    //user is verified now create the token
    const token = jwt.sign({email,role:"user"},SECRET_KEY,{expiresIn:"1h"})

    //set cookies
    res.cookie("isLoggedIn",true,{
        httpOnly:true
    });
    //saving the token in the cookie
    res.cookie("bearer-token",token);

    // Compare the provided password with the stored password
    if (user.password !== password) {
        return res.status(401).json({
            message: 'Invalid credentials',
            token:token
        });
    }

    res.status(200).json({
        message: 'Login successful',
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        token:token
    });

} catch (error) {
    res.status(500).json({
        message: "An error occurred during login",
        error: error.message,
    });
}
}

authRoute.route("/signup").post(createUser);

authRoute.route("/login").post(loginUser);


module.exports=authRoute;
