const express=require("express");
const Product=require("../schemas/products-schema");
const Category=require("../schemas/category-schema")
const Cart=require("../schemas/cart_items_schema");


const showAllProducts= async (req,res)=>{
try {
 
const allProducts=await Product.find();
res.json(allProducts);
   
} catch (error) {
res.status(404).send("Error fetching products "+error.message);    
}
}


const showSearchProducts= async(req, res)=>{
const {tag}= req.params;
  try {
  const products = await Product.find({
    tags: {$elemMatch :{ $regex: tag, $options :"i"}}
  });
  res.json(products);


} 

catch (error) {
 return  res.status(500).send("Error occured "+error.message)
}
}


const getFootwear = async (req, res) => {
  try {
    const category = await Category.findOne({ c_name: "Footwear" });
    if (!category) return res.status(404).send("Footwear category not found");

    const products = await Product.find({ p_category: category._id });
    res.json(products);
  } catch (error) {
    res.status(500).send("Error fetching Footwear products: " + error.message);
  }
};


const getLatestProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    const limited = shuffled.slice(0, 10); // Show 10 random products
    res.json(limited);
  } catch (error) {
    res.status(500).send("Error fetching latest products: " + error.message);
  }
};


const GetCategories= async (req, res)=>{

try {
  const allCategories= await Category.find();
  res.json(allCategories);
} catch (error) {
  res.status(404).send("Error fetching Categories "+ error.message)
}


}

const ProductsPerCategory= async(req, res)=>{
  const {id}=req.params;
const products_per_category=await Product.find({p_category:id}).populate('p_category'); 
res.json(products_per_category);

}




const ProductLandingPage= async(req, res)=>{
try{
 const { id } = req.params;
  const product = await Product.findById(id).populate('p_brand');
  res.json(product);
}
catch(error){
    res.status(404).send(`Error fetching the product with id: ${id} `+ error.message)
}
}

const addToCart= async (req,res)=>{
try {
  
const {userId, productId, quantity}=req.body;
 if (!userId || !productId || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }
 // Check if the item already exists in the user's cart
    const existingCartItem = await Cart.findOne({ userId, productId });

    if (existingCartItem) {
      // If item exists, update quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json({ message: "Cart updated", cartItem: existingCartItem });
    }

    // If item not in cart, create new cart item
    const newCartItem = new Cart({ userId, productId, quantity });
    await newCartItem.save();
      res.status(201).json({ message: "Added to cart", cartItem: newCartItem });

} catch (error) {
  res.status(500).json({message:"Failed to add items to cart "+error.message});
}

}


const cartItemsPerUser=async(req, res)=>{
try {
  const {id}=req.params;
  const items=await Cart.find({userId:id}).populate("productId");
  res.status(200).json(items || []);

} catch (error) {
  res.status(500).send("Error fetching Cart items "+error.message )
}
}



const updateCartQuantity=async(req,res)=>{
 const {quantity}=req.body;
 const {id}=req.params;
  try {

const updatedItem=await Cart.findByIdAndUpdate( id, {quantity}, {new:true});
res.json({quantity: updatedItem.quantity});
} catch (error) {
  res.status(500).json({message: "Error in uypdating quantity "+ error.message});
}

}

const deleteCartItem=async(req,res)=>{
const {id}=req.params;
try {
  const deletedItem=await Cart.findByIdAndDelete(id);
  if(!deletedItem){
   return  res.status(500).send("Item not found "+error.message);}
    res.status(201).json({message: "Item deleted successfully"});
  
} catch (error) {
  console.error(error)
  res.status(500).json({message:"Error in deleting item from Cart "+error.message});
}
}

const clearCart= async (req,res)=>{
  const {id : userId}=req.params;
  try {
    
    const res=await Cart.deleteMany({userId});
    if(res){
      return res.status(200).send("Cart Cleared up successfully.");
    }

  } catch (error) {
    res.status(500).send("Error in clearing Cart." + error.message)
  }

}



module.exports={showAllProducts, ProductLandingPage,
   addToCart, cartItemsPerUser,updateCartQuantity,
  GetCategories, ProductsPerCategory, getFootwear,
   getLatestProducts,deleteCartItem, clearCart, showSearchProducts };