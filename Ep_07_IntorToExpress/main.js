const express = require('express')
const app= express()



//routes 

// first parameter is the route
// second parameter is the call  back function
app.get('/',(req,res)=>{
    res.send("hello from the server")
})


//if you are not specifiy the full path then specify the directory
app.get('/home',(req,res)=>{
    res.sendFile('./views/index.htm',{root:__dirname})
})

//here we have applied the full path

app.get('/about',(req,res)=>{
    res.sendFile("/Users/sushilpandey/Desktop/WEB DEVELOPMENT/Backend/Ep_07_IntorToExpress/views/about.htm")
})

//redirect in expresss
app.get('/about-us',(req,res)=>{
    res.redirect('/about')
})

// error 404 

// this is written in the last as when ever we write anything in the browser that thing is matches with the created route and if none of the route did match then the  below will run  that why this is written in the  last.

app.use((req,res)=>{
res.status(404).sendFile('./views/Error.htm',{root:__dirname}) 
})



app.listen(3000,()=>{
    console.log("server is running")
})