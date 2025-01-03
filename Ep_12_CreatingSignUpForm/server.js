const express = require('express')
const app = express()
const authRouter = express.Router();


app.use('/auth',authRouter);
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

app.get('/',(req,res)=>{
    console.log("this is the base server")
    res.send("hello from the base server")
})

const getSignUpForm = (req,res)=>{
    res.sendFile('/public/signup.htm',{root:__dirname})
}

const getFormData = (req, res) => {
    console.log("Request received on /auth/signup POST");
    console.log("Request body:", req.body); // Check if the body is parsed correctly
    res.json({
        message: "The object is registered successfully",
        data:req.body,
    });
};


authRouter
.route('/signup')
.get(getSignUpForm)
.post(getFormData)











app.listen(3000,()=>{
    console.log("server is running")

})