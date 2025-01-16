const express = require('express');
const userRouter = express.Router();
const userModel = require('../Model/user.modal');
const {getAllUser,updateUser,deleteUser,getUserProfile} = require('../controller/user.controller')



// user option
userRouter
  .route('/:id')
  .delete(deleteUser)
  .patch(updateUser);

app.use(protectedRoute)
userRouter
.route('/user-profile')
.get(getUserProfile)


app.use(isAuthorized(['admin']))
userRouter
.route('/')
.get(getAllUser)

module.exports = userRouter;

