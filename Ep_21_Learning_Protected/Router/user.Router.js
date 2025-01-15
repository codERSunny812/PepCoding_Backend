const express = require("express");
const userRouter = express.Router();
const userModel = require("../Model/user.modal");

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.cookies.isLoggedIn) {
    next();
  } else {
    res.status(401).json({
      message: "You must be logged in to access this resource",
    });
  }
}

let getUser = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users.length) {
      return res.status(404).json({
        message: "No users found",
      });
    }

    res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving users",
      error: error.message,
    });
  }
};

let deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findByIdAndDelete(id);
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
      message: "Error deleting user",
      error: error.message,
    });
  }
};

let updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const user = await userModel.findByIdAndUpdate(id, updateData, { new: true });
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
      message: "Error updating user",
      error: error.message,
    });
  }
};

userRouter.use(isLoggedIn);

userRouter.route("/").get(getUser).patch(updateUser);
userRouter.route("/:id").delete(deleteUser);

module.exports = userRouter;
