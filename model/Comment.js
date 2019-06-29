const mongoose=require("mongoose");
var Schema=mongoose.Schema;
const comSchema = mongoose.Schema({
    RestaurantID: Schema.Types.ObjectId,

    Review:{
        type:String
    },
    User:{
        type:String
    },
  
});
const Comment=mongoose.model("Comment",comSchema);
module.exports= Comment;
