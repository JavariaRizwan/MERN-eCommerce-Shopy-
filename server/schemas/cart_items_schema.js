const mongoose=require("mongoose");

const cartSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        required:true
    }
})

const Cart=mongoose.model("Cart", cartSchema, "cart_items");
module.exports=Cart;