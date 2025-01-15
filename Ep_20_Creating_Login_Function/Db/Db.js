const moongoose = require('mongoose')


connectDB = ()=>{
    moongoose.connect("mongodb+srv://sengersunny448:8i7Rxxk7pxCk8vm5@cluster0.etsrm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
console.log("data base is successfully connected")
    })
    .catch((error)=>{
        console.error(error)
    })
}

module.exports=connectDB
