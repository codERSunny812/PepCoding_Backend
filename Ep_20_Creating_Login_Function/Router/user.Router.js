const express = require('express');
const userRouter = express.Router();
const userModel = require('../Model/user.modal');

// Function to get users
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

// Function to update a user
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

// Function to delete a user
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

// Define routes
userRouter
  .route('/')
  .get(getUser)
  .delete(deleteUser)
  .patch(updateUser);

module.exports = userRouter;