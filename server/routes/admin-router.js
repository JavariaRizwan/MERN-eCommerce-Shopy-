const express=require("express");
const adminRouter=express.Router();
const upload=require("../utils/uploadMiddleware")
const {addProduct, addCategory, addBrand}=require("../AdminRights/authAdmin");


adminRouter.post("/add-product", upload.fields([
  { name: "p_image_1", maxCount: 1 },
  { name: "p_image_2", maxCount: 1 }
]), addProduct);
adminRouter.post('/add-category', addCategory);
adminRouter.post('/add-brand', addBrand);



module.exports=adminRouter;