const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");

const userSchema=mongoose.Schema({
    Fname:{
        type:String
    },
    Lname:{
        type:String
    },
    Email:{
        type:String
    },
    Username:{
        type:String
    },
    Password:{
        type:String
    },
    Address:{
        type: String
    },
    Usertype:{
        type: String
    },
    Age:{
        type:String
    },
    ProfilePic:{
        type:String
    },
    tokens:[{
        token:{
        type:String,
        required:true
        }
    }]
});

userSchema.statics.checkCredentialsDb=async(Username,Password)=>
{
  
    const user1=await User.findOne({Username:Username,Password:Password})
    if(user1){
                console.log(user1);
                return user1;
    }
    else{
console.log("not found")
return;
    }

}

userSchema.methods.generateAuthToken=async function(){
    
    console.log("token");
  
    const user=this
    const token=jwt.sign({ _id:user._id.toString()},'thisismynewcourse')
    
    console.log(token);
    user.tokens=user.tokens.concat({token:token})
    await user.save()
    return token
}


const User=mongoose.model("User",userSchema);
module.exports=User;