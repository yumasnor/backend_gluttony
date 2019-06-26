const express=require("express");
const router=express.Router();
const User=require("../model/User");
const mongoose=require("mongoose");
const Auth = require('../Middleware/auth');
const path = require('path');
const multer=require("multer");

// router.use(express.static(path.join(__dirname,'UserImg')))
//registration 
router.post("/registeruser",(req,res)=>
{
    console.log(req.body);

    const user=new User(req.body);
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

//login
router.post("/Login",async function (req,res)
{
    
    var enteredUname=req.body.Username;
    var enteredpass=req.body.Password;
    console.log(enteredUname, enteredpass);
    const user=await User.checkCredentialsDb(enteredUname,enteredpass);
    if(user){
    const token=await user.generateAuthToken();
    res.send({
        token:token,
        userType:user.Usertype
    });
}
else{
    res.json({message:"Invalid"});
}
})

//log out
router.post('/logout', Auth, async (req,res) =>{
    try {
        req.user.tokens = [];
        await req.user.save()
        res.send()
        } catch (e) {
        res.status(500).send()
        }
       });

//show all user
router.get("/showuser",Auth,function(req,res){
   User.find().then(function(User){
        console.log(User);
        // res.json(houseModel);
        res.send(User);
    }).catch(function(e){
        res.send(e);
    })   
})    

//user update
router.put('/updateuser/:id',function(req,res){
    userid = req.param.id.toString();
    console.log(userid);
    console.log(req.body);
    User.findByIdAndUpdate(uid,req.body,{new: true}, (err,User) => {
        // Handle any possible database errors
        res.send(User);
        });
    })

//upload profile picture
var storage = multer.diskStorage({
    destination: 'ProfilePicture',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, 'User' + Date.now() + ext);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 1000000 }
});


    router.post('/uploadImg', upload.single('imageFile'), (req, res) => {
       res.send(req.file)
        });

router.get('/this',Auth,function(req,res){
    res.send(req.user);
})
module.exports=router;