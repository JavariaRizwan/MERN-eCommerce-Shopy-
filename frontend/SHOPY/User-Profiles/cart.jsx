import React , {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import { useUserCartItems } from "../allFunctionsJS/cartFunctions";
import { NavLink } from "react-router-dom";
import { deleteItemFromcart } from "../allFunctionsJS/cartFunctions";
import { toast } from "react-toastify";
import {  getUserAddressStatus } from "../allFunctionsJS/checkoutFunction";
import { useNavigate } from "react-router-dom";


const Wrapper = styled.div`
  width: 92%;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  margin: 30px 0;
`;

const CartHeader = styled.div`
  display: grid;
  grid-template-columns: 2.4fr 1fr 1fr 1fr 0.5fr;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

const CartRow = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr 1fr 0.5fr;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  .another i{
  cursor:pointer;
  &:hover{
  color:red;
    transition: 0.4s;}
  }
  }
`;

const Item = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }


  .highlight {
    color: #ff6600;
    font-weight: 600;
    margin-top: 5px;
  }

  p {
    margin: 3px 0;
    font-size: 0.9rem;
    color: #555;
  }
`;

const Price = styled.div`
  font-size: 1rem;
  margin-left:5px;
`;

const Quantity = styled.div`
  font-size: 1rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  button {
    padding: 2px 8px;
    font-size: 1rem;
    border: 1px solid #ccc;
    background: #f9f9f9;
    cursor: pointer;
  }
`;

const Total = styled.div`
  font-weight: 500;
`;

const Summary = styled.div`
  max-width: 400px;
  margin-left: auto;
  margin-top: 30px;
  padding: 20px;
  border-top: 1px solid #ccc;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
`;

const CouponRow = styled(SummaryRow)`
  align-items: center;
`;

const AddCoupon = styled.span`
  color: #0071e3;
  text-decoration: underline;
  cursor: pointer;
`;

const FreeShipping = styled.p`
  color: green;
  margin-top: 10px;
  font-size: 0.95rem;
`;

const StyledB = styled.button`
  margin-top: 20px;
  
  height:30px;
  padding: 8px;
  background-color: #000;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  text-decoration:none;
  &:hover {
    background-color: #222;
  }
`;

const StyledNav=styled(NavLink)`

    margin: 0;
    font-size: 1rem;
    text-decoration:none;
    font-weight:700;
    color:rgba(59, 58, 58, 1);
&:hover{
color:rgba(235, 106, 31, 1);
transition:0.3s;
}

`



const Cart = ({userId}) => {
  const [trigger, setTrigger] = useState(0);
  const navigate=useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = user;
  const cartItemsDB = useUserCartItems(user?._id, trigger);
  const [cartItems, setCartItems] = useState([]);

  const handleCheckout = async () => {
  const canCheckout = await getUserAddressStatus(user?._id);
  console.log(canCheckout);
  if (canCheckout) {
    navigate("/checkout");
  } else {
    toast.warn("You have not set your address. Please set it in Address section.");
    navigate(`/user_profile/${user?._id}`); // ✅ matches your route
  }
};


  useEffect(() => {
    setCartItems(cartItemsDB);
  }, [cartItemsDB]);

  const updateQuantity = async (itemId, currentQty, type) => {
    const newQty = type === "inc" ? currentQty + 1 : Math.max(1, currentQty - 1);
    try {
      const res = await axios.put(`/api/setCartQuantity/${itemId}`, { quantity: newQty });
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === itemId ? { ...item, quantity: res.data.quantity } : item
        )
      );
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
 
  const grandTotal = subtotal;

  return (
    <Wrapper>
      <Title>Your Cart ({cartItems.length} items)</Title>
      <CartHeader>
        <span>Item</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Total</span>
        <span>Delete</span>
</CartHeader>

      {cartItems.map((item) => (
        <CartRow key={item._id}>
                     <Item>
             <img src={`http://localhost:5000/${item.productId.p_image_1.replace(/\\/g, "/")}`} alt={item.productId.p_name} />
             <div>
               <StyledNav to={`/productLanding/${item.productId._id}`}>{item.productId.p_name}</StyledNav>
              
             </div>
           </Item>
          <Price>${item.productId.price.toFixed(2)}</Price>
          <Quantity>
            {item.productId.price > 0 ? (
              <QuantityControls>
                <button onClick={() => updateQuantity(item._id, item.quantity, "dec")}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity, "inc")}>+</button>
              </QuantityControls>
            ) : (
              <span>1</span>
            )}
          </Quantity>
          <Total>${(item.productId.price * item.quantity).toFixed(2)}</Total>
          <div className="another">
    <i className="fa-solid fa-trash-can" onClick={()=>deleteItemFromcart(item._id, setCartItems, toast, setTrigger)}></i>
  </div>
        </CartRow>
      ))}

      <Summary>
        <SummaryRow>
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </SummaryRow>
        <SummaryRow>
          <span>Sales Tax:</span>
          <span>0.00</span>
        </SummaryRow>
        <CouponRow>
          <span>Coupon Code:</span>
          <AddCoupon>Add Coupon</AddCoupon>
        </CouponRow>
        <SummaryRow bold>
          <span>Grand total:</span>
          <span>${grandTotal.toFixed(2)}</span>
        </SummaryRow>
        <FreeShipping>
          Congrats, you're eligible for <strong>Free Shipping</strong>
        </FreeShipping>
        <StyledB onClick={handleCheckout}>Check out</StyledB>
      </Summary>
    </Wrapper>
  );
};

export default Cart;