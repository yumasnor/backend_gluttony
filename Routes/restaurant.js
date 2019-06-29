const express=require("express");
const router=express.Router();
const Restaurant=require("../model/Restaurant");
const mongoose=require("mongoose");
const multer=require("multer");
const Auth = require('../Middleware/auth');
const path=require('path');
require('../DB/mongoose');



//image upload
var storage = multer.diskStorage({
  destination: 'location',
  filename: (req, file, callback) => {
      let ext = path.extname(file.originalname);
      callback(null, "Location" + Date.now() + ext);
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
  limits: { fileSize: 100000000 }
});

  router.post('/uploadlocation', upload.single('imageFile'), (req, res) => {
      res.send(req.file.filename)
      console.log(req.file)
  });

  //add restaurants
  router.post("/addrestaurant",(req,res)=>
{
    console.log(req.body);

    const restaurant=new Restaurant(req.body);
    restaurant
    .save()
    .then(result=>{
        
        console.log(result);
        res.status(201).json({
        message:"Restaurant added successfully"

        });
    })
    .catch(err=>{
        res.status(500).json({
            
            error:err,
           // console.log(error);
        })
    })
})

// show restaurant details
router.get("/showrestaurent",Auth,function(req,res){
  Restaurant.find().then(function(Restaurant){
      console.log(Restaurant);
      // res.json(houseModel);
      res.send(Restaurant);
  }).catch(function(e){
      res.send(e);
  })
})

//delete restaurant details
router.delete('/deleterestaurant/:id',Auth, function (req, res) {    
            
  console.log(req.params.id);
   Restaurant.findByIdAndDelete(req.params.id).then(function(){
       res.send("Successfully deleted");
   }).catch(function(e){
       res.send(e);
   }) ;
   });

//update restaurant details
router.put('/updaterestaurant',function(req,res){
  // userid = req.param.id.toString();
  uid = req.body._id;
  console.log(req.body._id);
  // console.log(userid);
  console.log(req.body);
  Restaurant.findByIdAndUpdate(uid,req.body,{new: true}, (err,User) => {
  res.send(User);
      });
  });

  router.get("/showonerestaurent/:id",Auth,function(req,res){
    rid=req.params.id.toString();
    Restaurant.findById(rid).then(function(Restaurant){
        console.log(Restaurant);
        // res.json(houseModel);
        res.json(Restaurant);
    }).catch(function(e){
        res.send(e);
    })
  })
  
  router.get('/this',Auth,function(req,res){
    res.send(req.resta);
})


  module.exports=router;

