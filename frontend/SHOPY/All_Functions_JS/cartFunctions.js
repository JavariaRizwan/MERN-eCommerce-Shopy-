// src/utils/cartUtils.js
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";


export const addToCart = async (product, quantity=1) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    toast.warn("Please log in first to add items to your cart.");
    return;
  }

  try {
    const cartItem = {
      userId: user._id,
      productId: product._id,
      quantity: quantity, // default quantity 1
    };

    const res = await axios.post("/api/addToCart", cartItem);
    toast.success("Item added to cart!");
    console.log("Cart response:", res.data);


  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("Failed to add item to cart.");
  }
};

export const useCartQuantity = (userId, trigger) => {
  const [cartQty, setCartQty] = useState(0);

  useEffect(() => {
    const fetchCartQuantity = async () => {
      try {
        const res = await axios.get(`/api/cartItems/${userId}`);
        const totalQty = res.data.reduce((acc, item) => acc + item.quantity, 0);
        setCartQty(totalQty);
      } catch (err) {
        console.error("Error fetching cart quantity:", err);
      }
    };

    if (userId) fetchCartQuantity();
  }, [userId, trigger]);

  return cartQty;
};

// cartUtils.js

export const useUserCartItems = (userId) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`/api/cartItems/${userId}`);
        setCartItems(res.data);
      } catch (error) {
        console.error("Error fetching user cart items:", error);
      }
    };

    fetchCartItems(); // <-- You forgot this line
  }, [userId]);

  return cartItems;
};


export const deleteItemFromcart= async (productId, setCartItems, toast, setTrigger)=>{
try {
  
const deleteItem= await axios.delete(`/api/deleteCartItem/${productId}`);
toast.success("Item deleted from cart!");

setCartItems((prev)=>prev.filter((item)=>item._id!==productId));
 setTrigger((prev) => prev + 1);

} catch (error) {
  toast.warn("Error in deleting item from cart "+ error.message);
}

}

 export const clearCart =async ()=>{
  try {
    const user=JSON.parse(localStorage.getItem("user"));
    const userId=user?._id;
    const response= await axios.delete(`/api/clearCart/${userId}`);
    if(response){
      toast.success("Cart Cleared up successfully");
    }
  } catch (error) {
    console.log(error.message);
  }
}
