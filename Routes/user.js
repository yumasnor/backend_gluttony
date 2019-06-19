const express=require("express");
const router=express.Router();
const User=require("../model/User");
const mongoose=require("mongoose");
const Auth = require('../Middleware/auth');

const multer=require("multer");
//const path=require("path");

//For user registration 


router.post("/registeruser",(req,res)=>
{
    console.log(req.body);

    const user=new User(req.body
        // Fname:req.body.firstname,
        // Lname:req.body.lastname,
        // Username:req.body.uname,
        // Password:req.body.password,
        // Address:req.body.address,
        // ProfilePic:req.body.profilepic,
        // Age:req.body.age
        );
    user
    .save()
    .then(result=>{
        
        console.log(result);
        res.status(201).json({
        message:"User Registered successfully",

        })
    })
    .catch(err=>{
        res.status(500).json({
            
            error:err,
           // console.log(error);
        })
    })
})

router.post("/Login",async function (req,res)
{
    
    var enteredUname=req.body.username;
    var enteredpass=req.body.password;
    console.log(enteredUname, enteredpass);
    const user=await User.checkCredentialsDb(enteredUname,enteredpass);
    if(user){
    const token=await user.generateAuthToken();
    res.status(201).json({
        token:token,
        user:user
    });
}
else{
    res.json({message:"Invalid"});
}
    // res.send({token});


})

router.get('/this',Auth,function(req,res){
    res.send(req.user);
})
module.exports=router;