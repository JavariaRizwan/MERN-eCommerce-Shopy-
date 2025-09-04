const mongoose=require("mongoose");

const userDetailSchema=new mongoose.Schema({

userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
},

phone:{
    type:String,
    default:null
},
address:{
    type:String,
    required:true,
    default:null,
},
zip:{
    type:Number,
    required:true,
    default:0,
},
province:{
    type:String,
    required:true,
    default:null,
},
state:{
    type:String,
    required:true,
    default:null,
},
city:{
    type:String,
    required:true,
    default:null,
},
billingMode:{
    type:String,
    required:true,
    default:"Cash on Delivery",
     enum: ["Cash on Delivery", "Online Payment"],
}
},
{
timestamps:true,

});

const userDetails=mongoose.model("userDetails", userDetailSchema);
module.exports=userDetails;