import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";



//styled Components

const Second = styled.div`
  width: 95%;
  margin: auto;
  background-color:#F5F5DC 
`;

const SlideContainer = styled.div`
margin-top:20px;
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
`;

const Slide = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity 0.8s ease-in-out;
`;
const Third=styled.div`
width:95%;
  font-family: "Roboto", sans-serif;

margin:15px auto;
display:flex;
justify-content:space-between;
height:130px;
`
const Secs=styled.div`
background-color:white;
height:135px;
width:135px;
cursor:pointer;
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items: center;
    font-size:16px;
    font-weight:500;
border:none;
border-radius:50%;
background-color:rgb(234, 231, 231);


img{
object-fit:contain;
width:70px;
height:70px}

&:hover{
transition:0.4s;
img{
width:72px;
height:72px
}}

`;
const Wrap=styled.div`
font-family:"Montserrat",sans-serif;
color:rgb(75, 75, 75);
border:3px solid rgb(247, 100, 42);
line-height:60px;
height:90px;
border-radius:6px;
width:80%;
margin:auto;
display:flex;
justify-content:space-around;
.one{
display:flex;
justify-content:space-between;
}
i{
color: rgb(247, 100, 42);
justify-content:center;
align-content:center;
text-align:center;
font-size:40px;
margin-right:15px;
}
`
const Nav=styled(NavLink)`
`



import img1 from "../one.jpg";
import img2 from "../two.jpg";
import img3 from "../three.jpg";
import img4 from "../four.jpg";
import img5 from "../five.jpg";
import home from "../home.png"
import wellness from "../wellness.png"
import j from "../jewellery.png"
import foot from "../footwear.png"
import bags from "../bags.png"
import beauty from "../Beauty.png"
import electronics from "../electronics.png"
import g from "../groceries.png"
const images = [img1, img2, img3, img4, img5];

//calling out  files to import
//import Categories from "../components/categories";
import {Products, Latest, Footwear} from "../components/products";
import {Sale, Seconds, Logos} from "../components/sale-component"


const Home=()=>{


  const [index, setIndex] = useState(0);

  useEffect(() => {
    const auto = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(auto);
  }, []);




return <>
 




 
  {/* Slideshow inside Second */}
      <Second className="second">
        <SlideContainer>
          {images.map((img, i) => (
            <Slide key={i} src={img} alt={`slide-${i}`} active={i === index} />
          ))}
        </SlideContainer>
      </Second>

<br />
<br />
<br />

{/* another section starts */}

<Third>

<Secs><Nav to="/products_per_category/686fe75947f5d27c7cfab1fa"><img src={home} alt="" /></Nav>Fashion</Secs>
<Secs><Nav to="/products_per_category/6873cd8d60371b9630495304"><img src={beauty} alt="" /></Nav>Beauty</Secs>
<Secs><Nav to="/products_per_category/6873d08560371b963049531a"><img src={j} alt="" /></Nav>Jewellery</Secs>
<Secs><Nav to="/products_per_category/6873cf6e60371b9630495314"><img src={wellness} alt="" /></Nav>Wellness</Secs>
<Secs><Nav to="/products_per_category/687111f10cb513af630a7f17"><img src={g} alt="" /></Nav>Groceries</Secs>
<Secs><Nav to="/products_per_category/6873c85f60371b96304952ea"><img src={bags} alt="" /></Nav>Bags</Secs>
<Secs><Nav to="/products_per_category/6873cbf560371b96304952f8"><img src={foot} alt="" /></Nav>Footwear</Secs>
<Secs><Nav to="/products_per_category/6871148f0cb513af630a7f25"><img src={electronics} alt="" /></Nav>Electronics</Secs>

</Third>

<br />
<br />


<Products />
<br />

<Sale />
<br />
<br />
<br /><br />

<Wrap>
<div className="one">
    <i className="fa-solid fa-truck"></i>
    <h1>Free Shipping</h1>
</div>

<p>Free Delivery Now On Your First Order and over $200</p>

<h2>- Only $200*</h2>
</Wrap>
<br />
<br /><br />

<Seconds />

<br /><br /><br />

<Latest />
<br /><br />
<Logos />
<br /><br />
<Footwear />


</>


}
export default Home;