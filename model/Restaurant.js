const mongoose=require("mongoose");

const restSchema = mongoose.Schema({

    Restaurantlogo:{
        type:String,
    },
    Restaurantname:{
        type:String
    },
    Restauranttype:{
        type:String
    },
    Restaurantdesc:{
        type:String,
    },
    Restaurantcontact:{
        type:String
    },
    Longitude:{
        type:String
    },
    Latitude:{
        type:String
    }
});
const Restaurant=mongoose.model("Restaurant",restSchema);
module.exports=Restaurant;
