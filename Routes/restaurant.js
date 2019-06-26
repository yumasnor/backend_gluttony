const express=require("express");
const router=express.Router();
const Restaurant=require("../model/Restaurant");
const mongoose=require("mongoose");
const multer=require("multer");
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
  module.exports=router;

