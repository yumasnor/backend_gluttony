const mongoose = require('mongoose');
const Reservation = mongoose.model('Reservation',{
    Username:{
        type:String
    },
    Restaurantlocation:{
        type:String
    },
   Restauranttype:{
        type:String 
    },
    Fname:{
        type:String
    },
    Lname:{
        type:String
    },
    Email:{
        type:String 
    },
    Message:{
        type:String
    }
});
module.exports = Reservation;
