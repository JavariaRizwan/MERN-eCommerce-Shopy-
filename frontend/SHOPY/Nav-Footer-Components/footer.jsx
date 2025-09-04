import styled from "styled-components";

import { Foot } from "./foot";

import { NavLink } from "react-router-dom";
const All = styled.div`
  font-family: "Montserrat", sans-serif;
  height: 90vh;
  margin-top: 40px;
  background-color: rgb(245, 243, 243);
border-bottom:1px solid rgb(190, 188, 188);
  `;

const Wrap = styled.div`
  width: 75%;
  color: rgb(54, 52, 52);
  margin: auto;
  display: flex;
  justify-content: Space-between;
`;

const Flex = styled.div`
  padding-top: 50px;
  display: Flex;
  text-align: center;
  height: 100px;
  flex-direction: column;
  p {
    font-size: 12px;
    margin-bottom: 10px;
  }
  h1 {
    font-size: 18px;
    margin-bottom: -5px;
    font-weight: 500;
  }
  i:hover {
    transition: 0.4s;
    color: rgb(247, 100, 42);
    transform: translateY(-10px);
  }
  i {
    font-size: 30px;
    color: rgb(68, 66, 66);
  }
`;
const Mine = styled.div`
  width: 95%;
  margin: auto;
  display: Flex;
  justify-content: space-between;
`;
const Contact = styled.div`
  height: 200px;
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  span {
    font-size: 25px;
    color: rgb(247, 100, 42);
    font-weight: 500;
    margin: 10px 0px;
  }
  h1,
  h2 {
    font-size: 20px;
    letter-spacing: 0.4px;
    color: rgb(72, 72, 71);
  }
  p {
    font-size: 14px;
  }
  margin-right: 10px;
  a {
    text-decoration: none;
    color: rgb(72, 72, 71);
  }
  a:hover {
    color: rgb(247, 100, 42);
    transition: 0.3s;
  }
`;
const Contacts = styled.div`
  height: 260px;
  width: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    font-size: 20px;
    letter-spacing: 0.4px;
    color: rgb(72, 72, 71);
  }
  &:nth-of-type(4) {
    width: 320px;
  }
    input{
    height:40px;
    padding:10px;
    outline:none;
    letter-spacing:0.5px;
    margin-bottom:10px;
    }

    button{
    width:100px;
    cursor:pointer;
    background-color:rgb(239, 28, 70);
    color:white;
    font-weight:600;
    padding:7px;
    border:1px solid rgb(239,28,70);
    letter-spacing:0.5px;
    border-radius:5px;
    }
    button:hover{
    color:rgb(239,28,70);
    background-color:white;
    transition:0.3s;
    }
p{
font-weight:300;
color:rgb(72, 72, 71)
}
  .combine{
  display:flex;
  justify-content:space-between;}

  .combine p{
  margin-left:10px;
  }
`;
const StyledLink = styled(NavLink)`
  font-weight: 300;
  color: rgb(72, 72, 71);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;




const Footer = () => {
  return (
    <>
      <All>
        <Wrap>
          <br />
          <Flex>
            <i className="fa-solid fa-truck-fast"></i>
            <h1>Free Shipping</h1>
            <p>For all Orders Over $100</p>
          </Flex>

          <Flex>
            <i className="fa-solid fa-person-walking-arrow-loop-left"></i>
            <h1>30 Days Returns</h1>
            <p>For an Exchange Product</p>
          </Flex>

          <Flex>
            <i className="fa-solid fa-money-check-dollar"></i>
            <h1>Secured Payment</h1>
            <p>Payment Cards Accepted</p>
          </Flex>

          <Flex>
            <i className="fa-solid fa-gifts"></i>
            <h1>Special Gifts</h1>
            <p>Our First Product Order</p>
          </Flex>

          <Flex>
            <i className="fa-solid fa-headphones"></i>
            <h1>Support 24/7</h1>
            <p>Contact us Anytime</p>
          </Flex>
        </Wrap>
        <br />
        <hr />
        <br />
        <br />

        <Mine>
          <Contact>
            <h1>Contact</h1>
            <p>Classyshop - Mega Super Store 507-Union Trade Centre France</p>

            <a href="mailto:example@example.com">Send Email for your queries</a>
            <span>(+92) 41-543-210</span>
            <h2>Get Help and Professional Chat</h2>
          </Contact>

          <Contacts>
            <h1>Products</h1>
            <StyledLink>Price Drops</StyledLink>
            <StyledLink>New Sales</StyledLink>
            <StyledLink>Best Product</StyledLink>
            <StyledLink>Best Sellers</StyledLink>
            <StyledLink to="/contact-us">Contact Us</StyledLink>
            <StyledLink>Stores</StyledLink>
          </Contacts>

          <Contacts>
            <h1>Our Company</h1>
            <StyledLink>Delivery</StyledLink>
            <StyledLink>Checkout</StyledLink>
            <StyledLink>Legal Notice</StyledLink>
            <StyledLink>About us</StyledLink>
            <StyledLink to="/Faqs">FAQ's</StyledLink>
            <StyledLink to="/TandC">Terms & Conditions</StyledLink>
          </Contacts>

          <Contacts>
            <h1>Subscribe to our newsLetter</h1>
            <p>
              Subscribe to our latest newsLetter to get news about latest offers
              and special prices;
            </p>
    <input type="text" placeholder="Your Email Address"/>
    <button>Subscribe</button>
<div className="combine">
<input type="checkbox" name="sub" id="sub" />
<p>I agree to the terms and conditions and the privacy policy</p>  
</div>

          </Contacts>
        </Mine>
      </All>
<br />
<Foot />

    </>
  );
};
export default Footer;
