const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");


const userSchema=new mongoose.Schema({
fullName:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true
},
password:{
    type:String,
    required:true
},
otp:{
    type:String,
    default:null
},
otpExpiry:{
    type: Date,
    default:null
} ,
isVerified:{
    type:Boolean,
    default:false
}

},

{
    timestamps:true
}
);


userSchema.methods.generateToken=function(){
    return jwt.sign({
        userId:this._id,
        username:this.fullName,
        isVerified:this.isVerified,
        
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn:"30d",
    }
)
}


const User=mongoose.model("User",userSchema);
module.exports=User;