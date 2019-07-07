const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');
const multer=require('multer');
// app.use(bodyParser.json());
const morgan=require('morgan');
const fs= require('fs');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
require('./DB/mongoose');
app.use('/logo',express.static('./logo'));
app.use(express.static("./ProfilePicture"));


const userRoute=require('./Routes/user');
const restaurantRoute = require('./Routes/restaurant');


app.use('/users',userRoute);
app.use('/restaurants',restaurantRoute);


module.exports=app;

