const mongoose=require("mongoose");

const restSchema = mongoose.Schema({
    Restaurantname:{
        type:String
    },
    Restauranttype:{
        type:String
    },
    Restaurantlocation:{
        type:String
    },
    Restaurantcontact:{
        type:String
    }
});
const Restaurant=mongoose.model("Restaurant",restSchema);
module.exports=Restaurant;
