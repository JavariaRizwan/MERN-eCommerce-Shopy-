const express=require("express");
const bcrypt=require("bcrypt");
const router=express.Router();
const User=require("../schemas/user-schema");
const crypto=require("crypto");
const sendEmail=require("../OTP_Handling/send_OTP_to_email");
const verifyOtp=require("../OTP_Handling/verifyOTP");
const userDetails = require("../schemas/user_detail_schema"); // Ensure this import is correct
  



const Register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send("Email already registered");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 60 * 60 * 1000); // 10 minutes

    const hashedPassword=await bcrypt.hash(password,10);
    const user = new User({ fullName, 
      email, 
      password:hashedPassword,
       otp,
        otpExpiry,
         isVerified: false });
    await user.save();

    await sendEmail(email, "Verify Your OTP", `Your OTP is: ${otp}`);
    res.status(200).send("OTP sent to your email.");
  } catch (err) {
    res.status(500).send("Registration failed: " + err.message);
  }
};



//login component;
const Login= async(req, res)=>{
const {email, password}=req.body;
try {
  const exist=await User.findOne({email});
  if(!exist){
   return res.status(404).send("User not found");
  }
  if(!exist.isVerified){
   return res.status(404).send("Email is not verified");
  }

 const isMatch = await bcrypt.compare(password, exist.password);
 if (!isMatch) return res.status(401).send("Incorrect Password");

 const token=exist.generateToken();
  res.status(200).send({message: "Login Successful",
user:{
  _id:exist._id,
fullName:exist.fullName,
email:exist.email,
isVerified:exist.isVerified
},
token
  }
  );

} catch (error) {
return  res.status(404).send("Login failed: " + error.message);
}
}




///another component function
const saveAddress= async (req, res)=>{
  const {userId,phone, address, zip, state, province, city, billingMode}=req.body;

try {
 
console.log("Received Address Data:", req.body);


   if(!userId){
  return res.status(400).send("User Id is required.");
}

const existing=await userDetails.findOne({userId});
if(existing){
  existing.zip=zip,
  existing.city=city, 
  existing.phone=phone,
  existing.province=province,
  existing.state=state,
  existing.address=address, 
  existing.billingMode=billingMode

   await existing.save();
      return res.status(200).json({ message: "Address updated successfully" });
}
 const newDetails = new userDetails({
      userId,
      address,
      zip,
      province,
      state,
      city,
      phone,
      billingMode,
    });

await newDetails.save();
return res.status(201).json({message: "User Address and Details are saved successfully."})


} catch (error) {
  res.status(500).json({message: "Error occured during saving user details"+ error.message})
}
 
}

const getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await userDetails.findOne({ userId });
    if (!data) return res.status(404).json({ message: "No address found" });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details: " + error.message });
  }
};



module.exports={Register, Login, saveAddress, getUserDetails};