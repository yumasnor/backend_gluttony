const express=require("express");
const router=express.Router();
const Restaurant=require("../model/Restaurant");
const mongoose=require("mongoose");
const multer=require("multer");
const Auth = require('../Middleware/auth');
const Comment=require('../model/Comment');
const path=require('path');
const async=require('async');
require('../DB/mongoose');



//UPLOAD LOCATION
var storage = multer.diskStorage({
  destination: 'logo',
  filename: (req, file, callback) => {
      let ext = path.extname(file.originalname);
      callback(null, "Logo" + Date.now() + ext);
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

  router.post('/uploadlogo', upload.single('imageFile'), (req, res) => {
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
router.put('/updaterestaurant/:id',function(req,res){
   uid = req.body._id;
  console.log(req.body._id);
   console.log(req.body);
  Restaurant.findByIdAndUpdate(uid,req.body,{new: true}, (err,Restaurant) => {
  res.send(Restaurant);
      });
  });

  router.get("/showonerestaurent/:id",function(req,res){
    id=req.params.id.toString();
    Restaurant.findById(id).then(function(restaurant){
        console.log(restaurant);
        res.send(restaurant);
    }).catch(function(e){
        res.send(e);
    })
  })
  
  router.get('/this',Auth,function(req,res){
    res.send(req.resta);
})

//TABLE BOOKING
router.get('/restroreview/:id', (req, res) => {
  var locals= {};
  async.parallel([
  //Load user Data
  function(callback) {
  Restaurant.findById(req.params.id,function(err,restaurant){
  if (err) return callback(err);
  locals.restaurant = restaurant;
  callback();
  });
  },
  //Load posts Data
  function(callback) {
  Comment.find({RestaurantID: req.params.id},function(err,comment){
  if (err) return callback(err);
  locals.comment = comment;
  console.log(comment);
  callback();
  }).sort({'_id': -1});
  }
  ], function(err) { 
  if (err) return ("Error");
  res.json( {
  restaurant: locals.restaurant,
  comment: locals.comment
  });
  });
  console.log(locals.comment);
  
  });
  
  


  module.exports=router;

