const mongoose=require("mongoose");

const order_schema= new mongoose.Schema({
userId:{
type:mongoose.Schema.Types.ObjectId,
required:true,
ref:"User"
},
date:{
    type:Date,
    required:true,
    default:Date.now(),
},
status:{
type:String,
enum:["Pending","Confirmed", "Verified", "Delivered" ],
default:"Pending"
},
total:{
    type:Number,
    required:true,
},
shippingAddress:{

    type:String,
    required:true
},
payment_method:{
    type:String,
    enum:["Cash On Delivery", "Online Payment"],
    required:true,
},

},
{
    timestamps:true
})

const OrderMaster=mongoose.model("OrderMaster", order_schema,"orderMaster");
module.exports=OrderMaster;