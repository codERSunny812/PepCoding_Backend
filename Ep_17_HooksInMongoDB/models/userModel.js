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
});

// Pre-save hook for hashing password
// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10); // Hash the password
//     }
//     next(); // Proceed to the next middleware or save operation
// });

userSchema.pre('save',function(){
    console.log("before saving in the data base",this);
})

userSchema.post('save',function(doc){
    console.log("after saving in the data base",doc)
})

const User = mongoose.model('User', userSchema);

module.exports = User;
