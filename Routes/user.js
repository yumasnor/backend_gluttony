const express=require("express");
const router=express.Router();
const User=require("../model/User");
const mongoose=require("mongoose");
const Auth = require('../Middleware/auth');
const Comment=require('../model/Comment');
const Reservation=require('../model/Reservation');
const path = require('path');
const multer=require("multer");



//REGISTRATION
router.post("/registeruser",(req,res)=>
{
    console.log(req.body);

    const user=new User(req.body);
    user
    .save()
    .then(result=>{
        
        console.log(result);
        res.status(201).json("User Registered successfully")
    })
    .catch(err=>{
        res.status(500).json({
            
            error:err,
           // console.log(error);
        })
    })
})

//LOGIN
router.post("/Login",async function (req,res)
{
    
    var enteredUname=req.body.Username;
    var enteredpass=req.body.Password;
    console.log(enteredUname, enteredpass);
    const user=await User.checkCredentialsDb(enteredUname,enteredpass);
    if(user){
    const token=await user.generateAuthToken();
    res.json({
        token:token,
        Username:enteredUname,
        Password:enteredpass,
        _id:user._id,
        user:user.Username,
        userType:user.Usertype
    });
}
else{
    res.json({message:"Invalid"});
}
})

//LOG OUT
router.post('/logout', Auth, async (req,res) =>{
    try {
        req.user.tokens = [];
        await req.user.save()
        res.send()
        } catch (e) {
        res.status(500).send()
        }
       });

//SHOW USER
router.get("/showuser",Auth,function(req,res){
   User.find().then(function(User){
        console.log(User);
        res.send(User);
    }).catch(function(e){
        res.send(e);
    })   
})    

//USER UPDATE
router.put('/updateuser',function(req,res){
    // userid = req.param.id.toString();
    uid = req.body._id;
    console.log(req.body._id);
    // console.log(userid);
    console.log(req.body);
    User.findByIdAndUpdate(uid,req.body,{new: true}, (err,User) => {
    res.send(User);
        });
    })

//UPLOAD PROFILE PICTURE
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

//SHOW ALL USERS
router.get("/alluser",Auth,function(req,res){
    User.find().then(function(User){
        console.log(User);
        // res.json(houseModel);
        res.send(User);
    }).catch(function(e){
        res.send(e);
    })
  })

//DELETE USER        
router.delete('/deleteuser/:id',Auth, function (req, res) {    
    
    console.log(req.params.id);
        User.findByIdAndDelete(req.params.id).then(function(){
            res.send("Successfully deleted");
        }).catch(function(e){
            res.send(e);
        }) ;
        });        

//Comment
router.post('/comment',(req,res)=>{
            var comment = new Comment();

            comment.RestaurantID = req.body.RestaurantID;
            comment.Review = req.body.Review;
            comment.User = req.body.User;

            comment.save((err,doc)=>{
                if(err){
                    console.log('Error');
                 
                }
                else {
                    res.json('Success');
                }
            })
    });      

router.post('/bookTable',Auth,function(req,res){
    var reservationData = new Reservation({...req.body,userId:req.user._id});
    reservationData.save().then(function(){
        res.send('Table Reserved'); 
    }).catch(function(e){

    });
    console.log(req.body);
})

router.get('/this',Auth,function(req,res){
    res.send(req.user);
})
module.exports=router;