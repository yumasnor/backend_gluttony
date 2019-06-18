const express=require('express');
const app=express();

const bodyParser=require('body-parser');

const cors=require('cors');
const path=require('path');
const multer=require('multer');
// app.use(bodyParser.json());

const morgan=require('morgan');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
require('./DB/mongoose');

const userRoute=require('./Routes/user');

app.use('/users',userRoute);

module.exports=app;