const User = require("../Model/user.modal");



// Function to get data of all user

 module.exports.getAllUser = async (req, res) => {
    try {
        let users = await   User.find();

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

// function to get data of specific student
module.exports.getUserProfile = async(req,res)=>{
const id = req.params.id
try {
    let user = User.findById(id);
    if(!user){
        res.status(404).json({
            message:"no user  found"
        })
    }


    res.status(200).json({
        message:"user profile found",
        data:user
    })
} catch (error) {
    res.json(400).json({
        message:error.message
    })
}
}


// function to update any user 
module.exports.updateUser = async (req, res) => {
    const  id  = req.params.id;
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

// function to delete any user 
module.exports.deleteUser = async (req, res) => {
  const  id  = req.params.id;

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
