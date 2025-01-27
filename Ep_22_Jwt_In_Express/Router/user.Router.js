const express = require('express');
const userRouter = express.Router();
const userModel = require('../Model/user.modal');

// Function to get data of all user
let getUser = async (req, res) => {
  try {
    let users = await userModel.find();

    if (users.length === 0) {
      return res.status(404).json({
        message: "There are no users in the database",
      });
    }

    res.status(200).json({
      message: "These are the users in the database",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching users",
      error: error.message,
    });
  }
};

// Function to update  the data of any specific user
let updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    if (!id) {
      return res.status(400).json({
        message: "User ID is required for updating a user",
      });
    }

    let user = await userModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the user",
      error: error.message,
    });
  }
};

// Function to delete any specific user
let deleteUser = async (req, res) => {
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(400).json({
        message: "User ID is required for deleting a user",
      });
    }

    let user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the user",
      error: error.message,
    });
  }
};

//function to allow only loggedIn user can see the all user list
function isLoggedIn(req,res,next){
  if(req.cookies.isLoggedIn){
    next();
  }else{
    res.status(401).json({
      message:"the user is not logged in you have to loggedIn first to  access the data"
    })
  }
}
// Define routes
userRouter
  .route('/')
  // we have proctected this route so that only loggedin user will get the data fo all user
  .get(isLoggedIn,getUser)
  .delete(deleteUser)
  .patch(updateUser);

module.exports = userRouter;

