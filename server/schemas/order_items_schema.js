const mongoose=require("mongoose");

const order_items_schema= new mongoose.Schema({
orderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"OrderMaster",
    required:true,
},
productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true,
},
quantity:{
    type:Number,
    required:true
},
price: {
  type: Number,
  required: true,
}


},
{
    timestamps:true
}
)

const OrderDetail=mongoose.model("OrderDetail", order_items_schema, "orderDetail");
module.exports=OrderDetail;