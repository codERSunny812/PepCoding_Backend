const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const salt = 10

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
    }
});

//hook to hash a password
userSchema.pre('save',async function(next){
   
        this.password = await bcrypt.hash(this.password, 10); // Hash the password

    next(); // Proceed to the next middleware or save operation
})



const User = mongoose.model('User', userSchema);

module.exports = User;
