
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUserCartItems } from "../allFunctionsJS/cartFunctions";
import { NavLink } from "react-router-dom";
import logo from "/l.jpg";
import { userDetails } from "../allFunctionsJS/checkoutFunction";
import { FaCheckCircle } from "react-icons/fa";
import { makeOrder } from "../allFunctionsJS/orderFunction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../allFunctionsJS/cartFunctions";


const Container = styled.div`
  padding: 30px;
  width: 90%;
  margin: auto;
  font-family: "Montserrat", sans-serif;
`;

const TopBar = styled.div`
  display: flex;
  width: 30%;
  position: relative;
  right: 0;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;

const Left = styled.div`
  flex: 1;
  width: 60%;
`;

const Step = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const StepNumber = styled.div`
  font-size: 24px;
  margin-right: 15px;
`;

const StepContent = styled.div`
  flex: 1;

  h3 {
    margin-bottom: 5px;
  }

  p {
    font-size: 12px;
    color: gray;
    margin-bottom: 15px;
  }
  .mine {
    gap: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    label {
      margin-left: 20px;
    }
  }
`;

const CollapsedStep = styled.div`
  font-weight: bold;
  margin: 10px 0;
  padding: 10px;
  background: #f9f9f9;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  outline: none;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: black;
  color: white;
  font-weight: bold;
  width: 50%;

  border: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(36, 35, 35, 1);
    transition: 0.3s;
  }
`;

const Right = styled.div`
  flex: 1;
  width: 40%;
`;

const Summary = styled.div`
  background: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
`;

const PromoInput = styled.div`
  display: flex;
  margin: 10px 0;

  input {
    flex: 1;
    outline: none;
    padding: 10px;
    border: 1px solid #ccc;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  button {
    padding: 10px 15px;
    background: black;
    color: white;
    border: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const Totals = styled.div`
  margin: 15px 0;
  div {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
  }

  .total {
    font-weight: bold;
    border-top: 1px solid #ccc;
    padding-top: 10px;
  }
`;

const SplitPay = styled.p`
  font-size: 12px;
  color: gray;
`;

const CartList = styled.div`
  margin: 20px 0;
`;

const CartItem = styled.div`
  margin: 10px 0;

  p {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  span {
    font-size: 20px;
    font-weight: bold;
    color: red;
  }
  small {
    color: gray;
    font-size: 12px;
  }
  .combin {
    width: 100%;
    align-content: center;
    display: flex;
    justify-content: space-between;
  }
  .h {
    font-size: 17px;
    color: rgba(36, 36, 36, 1);
  }
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  padding: 10px;
`;

const Help = styled.div`
  font-size: 12px;
  margin-top: 20px;

  h4 {
    margin-bottom: 5px;
  }

  a {
    color: blue;
    text-decoration: underline;
  }

  p {
    margin: 5px 0;
  }
`;

const Checkout = () => {
const navigate=useNavigate();


  const [trigger, setTrigger] = useState(0);
  const [items, setCartItems] = useState([]);
  const [userAddressDetails, setUserAddressDetails] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});

 

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?._id;

  useEffect(() => {
    const fetchUserAddressDetails = async () => {
      if (user?._id) {
        const res = await userDetails(id);
        setUserAddressDetails(res);
      }
    };
    fetchUserAddressDetails();
  }, [user]);

  const cartItems = useUserCartItems(user?._id, trigger);

  useEffect(() => {
    setCartItems(cartItems);
  }, [cartItems]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  //handleOrder function

  const handleOrder= async()=>{
    const orderDetails={
        userId:user?._id,
        total:subtotal,
        date:new Date(),
        status:"Pending",
        shippingAddress:userAddressDetails?.address,
        payment_method:"Cash On Delivery",
        items:cartItems.map((item)=>({
        productId:item.productId,
        quantity:item.quantity,
        price:item.productId.price
      }))
    };

    try {
      const result=await makeOrder(orderDetails);
      console.log("Order placed successfully.");
      setCartItems([]);
      clearCart(id);
      navigate('/all-products');
    } catch (error) {
      toast.warn("Error occured while making order");
      console.log(error.message);
    } 
  }



  const markStepComplete = (step) => {
    setCompletedSteps((prev) => ({ ...prev, [step]: true }));
    setActiveStep(step + 1);
  };

  const StepHeader = ({ number, title }) => (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
    >
      <StepNumber>{number}</StepNumber>
      <h3 style={{ marginRight: "10px" }}>{title}</h3>
      {completedSteps[number] && <FaCheckCircle color="green" />}
    </div>
  );

  return (
    <Container>
      <h1>Checkout</h1>
      <TopBar>
        <span>Order subtotal ({itemCount} Items):</span>
        <b>${subtotal}</b>
      </TopBar>

      <Content>
        <Left>
          {/* Step 1 */}
          {activeStep === 1 ? (
            <Step>
              <StepContent>
                <StepHeader number={1} title="Shipping address" />
                <p>
                  Address lookup powered by Google, view{" "}
                  <NavLink to="/privacy-policy">Privacy policy</NavLink>. To opt
                  out change{" "}
                  <NavLink to="/cookie-policy">cookie preferences</NavLink>.
                </p>
                <Form>
                  <InputWrapper>
                    <Input
                      placeholder="First name *"
                      value={user?.fullName}
                      readOnly
                    />
                    <Input
                      placeholder="E-mail *"
                      value={user?.email}
                      readOnly
                    />
                  </InputWrapper>
                  <Input
                    placeholder="Address 1 - Street or P.O. Box *"
                    value={userAddressDetails?.address || ""}
                    readOnly
                  />
                  <InputWrapper>
                    <Input
                      placeholder="State *"
                      value={userAddressDetails?.state || ""}
                      readOnly
                    />
                    <Input
                      placeholder="City *"
                      value={userAddressDetails?.city || ""}
                      readOnly
                    />
                    <Input
                      placeholder="Zip Code *"
                      value={userAddressDetails?.zip || ""}
                      readOnly
                    />
                  </InputWrapper>
                  <Button onClick={() => markStepComplete(1)}>
                    Continue to shipping method
                  </Button>
                </Form>
              </StepContent>
            </Step>
          ) : (
            <CollapsedStep>
              <StepHeader number={1} title="Shipping address" />
            </CollapsedStep>
          )}

          {/* Step 2 */}
          {activeStep === 2 ? (
            <Step>
              <StepContent>
                <StepHeader number={2} title="Shipping method" />
                <p>Free Standard Shipping (3–5 business days)</p>
                <Button onClick={() => markStepComplete(2)}>
                  Continue to payment
                </Button>
              </StepContent>
            </Step>
          ) : (
            <CollapsedStep>
              <StepHeader number={2} title="Shipping method" />
            </CollapsedStep>
          )}

          {/* Step 3 */}
          {activeStep === 3 ? (
            <Step>
              <StepContent>
                <StepHeader number={3} title="Payment" />
                <p>Your Selected Payment method is</p>
                <div className="mine">
                  <div className="clo">
                    <input
                      type="radio"
                      name="payment"
                      id="cod"
                      checked
                      value="Cash On Delivery"
                    />
                    <label htmlFor="cod">Cash On Delivery</label>
                  </div>

                  <Button onClick={() => markStepComplete(3)}>
                    Review & place order
                  </Button>
                </div>
              </StepContent>
            </Step>
          ) : (
            <CollapsedStep>
              <StepHeader number={3} title="Payment" />
            </CollapsedStep>
          )}

          {/* Step 4 */}
          {activeStep === 4 ? (
            <Step>
              <StepContent>
                <StepHeader number={4} title="Review & place order" />
                <p>Review your items and confirm shipping and payment info.</p>
                <Button onClick={handleOrder}>
                  Place Order
                </Button>
              </StepContent>
            </Step>
          ) : (
            <CollapsedStep>
              <StepHeader number={4} title="Review & place order" />
            </CollapsedStep>
          )}
        </Left>

        <Right>
          <Summary>
            <h3>Summary</h3>
            <PromoInput>
              <input placeholder="Enter code" />
              <button>→</button>
            </PromoInput>
            <Totals>
              <div>
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div>
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div>
                <span>Estimated tax</span>
                <span>--</span>
              </div>
              <div className="total">
                <span>Total</span>
                <span>${subtotal}</span>
              </div>
            </Totals>
            <SplitPay>
              4 interest-free payments of ${(subtotal / 4).toFixed(2)} with
              SHOPY. <a href="#">Learn More</a>
            </SplitPay>
          </Summary>

          <CartList>
            <h2>Cart ({itemCount} Items)</h2>
            {cartItems.map((item) => (
              <CartItem key={item._id}>
                <div className="combin">
                  <img
                    src={`http://localhost:5000/${item.productId.p_image_1.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt="Product"
                    width="50"
                    height="50"
                  />
                  <p>
                    <b className="h">
                      {item.productId.p_name.length > 30
                        ? item.productId.p_name.slice(0, 30) + "..."
                        : item.productId.p_name}
                    </b>
                  </p>
                  <p>
                    <span>{item.quantity}</span>
                  </p>
                </div>
                <small>
                  {item.productId.p_description.length > 100
                    ? item.productId.p_description.slice(0, 100) + "..."
                    : item.productId.p_description}
                  <br />
                  Color: {item.productId.color || "null"}
                  <br />
                  Size: {item.productId.size || "null"}
                  <br />
                  Quantity: {item.quantity}
                </small>
              </CartItem>
            ))}
          </CartList>

          <Help>
            <h4>Need help?</h4>
            <NavLink to="/help-center">Visit our Help Center</NavLink>
            <p>
              Call us
              <br />
              855-427-6657
              <br />
              Mon–Fri 6am–5pm PST
            </p>
            <img src={logo} alt="Secure" width="100" />
          </Help>
        </Right>
      </Content>
    </Container>
  );
};

export default Checkout;
