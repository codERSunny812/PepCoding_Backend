const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        // required:true
    },
    password:{
        type:String,
        // required:true,
        minLength:7

    },
    confirmPassword:{
        type: String,
        // required: true,
        minLength: 7
    }
})

const userModel = mongoose.model('userModel',userSchema)


module.exports=userModel;