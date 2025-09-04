const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  p_name: {
    type: String,
    required: true,
  },
  p_brand:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Brand',
    required:true
  },
  tags: {
  type: [String], // array of strings
  default: []
}
  ,
  p_category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category',
    required:true
  },
  p_description: {
    type: String,
    required: true,
  },
  p_image_1:{
    type:String,
    required:true,
  },
  p_image_2:{
    type:String,
    required:true
  }
  ,
  size:{
    type:String,
    default:"normal"
  },
  color:{
    type:String,
    default:"random"
  }
  ,
  price: {
    type: Number,
    required: true,
  },
  p_quantity: {
    type: Number,
    required: true,
  }
},
{  timestamps: true,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
