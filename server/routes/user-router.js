const express=require("express");
const router=express.Router();

const {Register, Login, saveAddress,  getUserDetails}= require("../components/authComponent");
const verifyOTP = require("../OTP_Handling/verifyOTP");
const { showAllProducts, GetCategories , deleteCartItem, showSearchProducts,
      addToCart, cartItemsPerUser, updateCartQuantity, clearCart,
     ProductsPerCategory, getFootwear, getLatestProducts} =require("../Products_Rendering/product_management");
const {ProductLandingPage} =require("../Products_Rendering/product_management")
const {makeOrder}=require("../orderHandling/orderComponent")

router.post('/register', Register);
router.post('/login', Login);
router.post("/verify-otp", verifyOTP);
router.get("/all-products", showAllProducts);
router.get('/productLanding/:id', ProductLandingPage)
router.get('/category', GetCategories);
router.get('/product_per_category/:id', ProductsPerCategory)
router.get("/footwear", getFootwear);
router.get("/latest-products", getLatestProducts);
router.get("/user_details/:id", getUserDetails);
router.get("/searchProduct/:tag", showSearchProducts);
router.post("/save_address_details", saveAddress);
router.post("/addToCart", addToCart);
router.put("/setCartQuantity/:id", updateCartQuantity);
router.delete("/deleteCartItem/:id", deleteCartItem);
router.delete("/clearCart/:id", clearCart);
router.post("/makeOrder", makeOrder);

router.get("/cartItems/:id", cartItemsPerUser);




module.exports=router;
