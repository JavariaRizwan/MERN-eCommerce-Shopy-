import cart from "../empty-cart.png";
import styled, {keyframes} from "styled-components";
import {useNavigate} from "react-router-dom"
import { NavLink } from "react-router-dom";
import {useCartQuantity} from "../allFunctionsJS/cartFunctions";
import { useUserCartItems, deleteItemFromcart } from "../allFunctionsJS/cartFunctions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserAddressStatus } from "../allFunctionsJS/checkoutFunction";


const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  font-family:"Montserrat",sans-serif;
  left: 0;
  width: 100vw;
  height: 100vh;
  color:rgb(67, 67, 67);
  background-color: rgba(0, 0, 0, 0.4); // shadow
  z-index: 999; // above everything else
  display: flex;
  justify-content: flex-end;
  .com{
  width:95%;
  margin:auto;
  display:flex;
  justify-content:space-between;
  .ic{
  
  text-align:center;
  align-content:center;
  }
  i{
  cursor:pointer;
  &:hover{
  color:rgb(247, 100, 42);
    transition: 0.4s;}
  }
  }
`;


const Crate=styled.div`

 height: 100%;
  width: 300px;
  background-color: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow-y: scroll;
  animation: ${slideIn} 0.3s ease forwards;

`


const BODY=styled.div`
height:100%;
width:100%;
.image{
width:270px;
height:270px;
margin:auto;
img{
width:250px;
height:250px;
}
}
h3{
text-align:center;
font-weight:600;
}
`
const StyleNav = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  text-align: center;
  padding: 10px 20px;
  background-color: rgb(228, 6, 95);
  color: white;
  border: 1px solid rgb(228, 6, 95);
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: rgb(180, 0, 70);
  }
`;


const StyleNave = styled.button`
  display: inline-block;
  text-decoration: none;
  text-align: center;
  padding: 10px 20px;
  background-color: black;
  color: white;
  border: 1px solid black;
  border-radius: 6px;
  font-weight: 500;
  font-family:"Montserrat", sans-serif;
  cursor: pointer;
  transition: background 0.3s ease;
  letter-spacing:0.3px;
  font-size:16px;
  &:hover {
    background-color: white;
    color:black;
    transition:0.3s;
  }
`;

const CenterWrapper = styled.div`
  display: flex;
  width:80%;
  margin:auto;
  justify-content: center;
  flex-direction:column;
  gap:15px;
 
`;
const Flow=styled.div`
width:100%;
min-height:60%;
display:flex;
flex-direction:column;
gap:15px;
`;
const Group=styled.div`
width:100%;
height:80px;
 box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
 p{
 font-size:12px;
 
 }
 .hello{
 display:flex;
 height:50px;
 width:100%;
 gap:5px;
 img{
 width:50px;
 height:50px;
 }
 }
.good{
height:50px;
display:flex;
flex-direction:column;
p
{
margin:0px;}
}
.blow{
display:flex;
i{
position:absolute;
right:70px;
margin-top:10px;
cursor:pointer;
margin-left:40px;
}
i:hover{
color:red;
transition:0.4s;
}
}


`
const StyledNav=styled(NavLink)`
font-size:12px;
text-decoration:none;
margin-top:10px;
color:rgba(49, 48, 48, 1);
font-weight:600;
&:hover{
color:rgba(223, 103, 28, 1);
transition:0.3s;
}
`



const Cart=()=>{
const navigate=useNavigate();

  const handleCheckout = async () => {
  const canCheckout = await getUserAddressStatus(user?._id);
  if (canCheckout) {
    navigate("/checkout");
  } else {
    toast.warn("You have not set your address. Please set it in Address section.");
    navigate(`/user_profile/${user?._id}`); // ✅ matches your route
  }
};


const closeCart=()=>{
document.getElementById("overlay").style.display="none";
navigate('/');

}
const [trigger, setTrigger] = useState(0);

const [cartItems, setCartItems]=useState([]);
const user=JSON.parse(localStorage.getItem("user"));
const quantity=useCartQuantity(user?._id, trigger);
const items=useUserCartItems(user?._id);

useEffect(()=>{
  setCartItems(items);
},[items])
const isLoggedIn=user;


return <>

<Overlay id="overlay">

<Crate>
    <div className="com">
<h2>Shopping Cart <span>({quantity})</span></h2> 

<div className="ic"><i className="fa-solid fa-xmark" onClick={closeCart}></i></div>
</div>
<BODY>

{(quantity === 0 || !isLoggedIn) ? (
  <>
  <div className="image">
    <img src={cart} alt="" />
  </div>
  <h3>Your cart is empty</h3>
  </>
) : (
  <>
  <div>
    <p>You have {quantity} item(s) in cart.</p>

 </div>


  <Flow>
  
{cartItems.map((item) => (
  
<Group><div key={item._id}>
    <div className="hello">
    <img src={`http://localhost:5000/${item.productId.p_image_1.replace(/\\/g, "/")}`} alt={item.productId.p_name} />
    <div className="good">
    <StyledNav to={`/productLanding/${item.productId._id}`}> {item.productId.p_name.length > 30
    ? item.productId.p_name.slice(0, 30) + "..."
    : item.productId.p_name}</StyledNav>
<div className="blow">
  <div className="miss">
    <p>Quantity: {item.quantity}</p>
    <p>Price: Rs {item.productId.price}</p>
  </div>
  <div className="another">
    <i className="fa-solid fa-trash-can" onClick={()=>deleteItemFromcart(item._id, setCartItems, toast, setTrigger)}></i>
  </div>
</div>

    </div>
  </div>
 </div>
  </Group>
))}

  

  </Flow>
</>
 
)}


<CenterWrapper>

<StyleNav to="/">Continue Shopping</StyleNav>
<StyleNave onClick={handleCheckout}>Checkout</StyleNave>
</CenterWrapper>
</BODY>
</Crate>
</Overlay>
</>
}
export default Cart;