import axios from "axios";
import { toast } from "react-toastify";

export const makeOrder= async (orderData)=>{
try {
    const response=await axios.post("/api/makeOrder",orderData);
    if(response.status===201){
        toast.success("Happy Customer! Your order has been placed.");
        return response.data;
    }

} catch (error) {
    toast.warn(error.message);
}

}
