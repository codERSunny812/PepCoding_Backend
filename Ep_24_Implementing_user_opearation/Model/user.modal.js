const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        default: 18,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','user','restaurant ownwer','delivary boy'],
        default:'user'
    },
    profileImg:{
        type:String,
        default:'img/user/default.png'
    }
});



const User = mongoose.model('User', userSchema);

module.exports = User;
