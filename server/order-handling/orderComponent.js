const express=require("express");
const orderMaster=require("../schemas/order-schema");
const orderDetails=require("../schemas/order_items_schema");



const makeOrder=async(req,res)=>{
const {items ,userId, date, status, total, shippingAddress, payment_method }=req.body;
try {
    
const newOrder=await orderMaster.create({
     userId,
     date,
     status,
     total,
     shippingAddress,
     payment_method
});
const orderItems=items.map((item)=>({
orderId:newOrder._id,
productId:item.productId,
quantity:item.quantity,
price:item.price
}
)
)
const makeOrderDetails=await orderDetails.insertMany(orderItems);
if(newOrder && makeOrderDetails){
    return res.status(201).send("Order placed successfully")
}


} catch (error) {
    res.status(500).json({message:"Error occured while making order "+ error.message});
}


}
module.exports={makeOrder}