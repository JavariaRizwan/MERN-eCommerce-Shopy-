// utils/checkout.js
import axios from "axios";
import { toast } from "react-toastify";


export const getUserAddressStatus = async (userId) => {
  try {
    const res = await axios.get(`/api/user_details/${userId}`);
   
    const user = res.data;
//console.log("Fetched User Address:", user); // 🧠 Debugging line

    if ( user.address?.trim() &&
      user.city?.trim() &&
      user.state?.trim() &&
      user.province?.trim()) {
      return true; // ✅ All address fields present
    } else {
      return false; // ❌ Missing address
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return false;
  }
};

export const userDetails= async (userId)=>{
try {
 
  const res=await axios.get(`/api/user_details/${userId}`);
  return res.data;

} catch (error) {
toast.warn("Unexpected error occured " + error.message);  
}


}