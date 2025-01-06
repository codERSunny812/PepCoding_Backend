// const mongoose = require('mongoose')
const mongoose   = require('mongoose')
const connectDb = () => {
    mongoose.connect("mongodb+srv://sengersunny448:8i7Rxxk7pxCk8vm5@cluster0.etsrm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => {
            console.log("mongoDB is successfully connected")
        })
        .catch((e) => {
            console.log("error", e)
        })
}

module.exports=connectDb;

