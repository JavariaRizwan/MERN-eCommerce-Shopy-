import styled from "styled-components";

import girl from "../girl.jpg";
import bag from "../bag.png";
import bm from "../bm.jpg";
import sh from "../sh.jpg";
import fashion from "../fashion.webp"
import mobile from "../mobile.webp";
import iphone from "../iphone.webp";
import coke from "../coke.webp";

const Combine=styled.div`
font-family:"Montserrat",sans-serif;
display:flex;
justify-content:space-between;
width:95%;
height:380px;
margin:auto;
`
const Rit=styled.div`
width:60%;
border-radius:20px;
text-align:right !important;
background-image:url("../bskin.jpg"), url("../pskin.jpg");
background-repeat:repeat, repeat;
background-position: left top, right top;
color:rgb(28, 36, 92);
padding-right:10px;
p{
margin-top:150px;
}
.two{
  display: flex;
  align-items: flex-end;
  flex-direction:column;
  margin-top:20px;
  }
button{
width:150px;
height:40px;
transition:0.3s;
background-color:rgb(247, 100, 42);
color:white;
border:2px solid rgb(247, 100, 42);
border-radius:10px;
font-weight:bold;
font-size:18px;
align-content:right;
justify-content:right;
cursor:pointer;}
button:hover{
background-color:white;
color:rgb(247, 100, 42);
}

span{
margin-bottom:10px;
margin-top:-15px;

}

`;
const Left=styled.div`
display:flex;
width:35%;
flex-direction:column;
justify-content:space-between;
`
const On=styled.div`
border-radius:20px;
width:100%;
background-size:cover;
height:47%;
text-align:right;
padding-right:10px;
background-image:url("../sh.jpg");
p{
margin-top:30px;
font-weight:700;
font-size:19px;
color:rgb(28, 36, 92);
}
button{
width:120px;
height:35px;
transition:0.3s;
background-color:rgb(247, 100, 42);
color:white;
border:2px solid rgb(247, 100, 42);
border-radius:10px;
font-weight:bold;
font-size:16px;
align-content:right;
justify-content:right;
cursor:pointer;}
button:hover{
background-color:white;
color:rgb(247, 100, 42);
}
`
const To= styled.div`
border-radius:20px;
width:100%;
padding-right:10px;

background-image:url("../bm.jpg");
text-align:right;
p{
margin-top:30px;
font-weight:700;
font-size:19px;
color:rgb(28, 36, 92);
}
button{
width:120px;
height:35px;
transition:0.3s;
background-color:rgb(247, 100, 42);
color:white;
border:2px solid rgb(247, 100, 42);
border-radius:10px;
font-weight:bold;
font-size:16px;
align-content:right;
justify-content:right;
cursor:pointer;}
button:hover{
background-color:white;
color:rgb(247, 100, 42);
}
height:47%;

`;
const Com=styled.div`
width:95%;
margin:auto;
height:200px;
display:flex;
justify-content:space-between;
font-family:"Montserrat",sans-serif;
`;

const Card = styled.div`
  
position:relative;
overflow:hidden;
&:nth-of-type(1) {
h1{
text-align:right;
font-size:20px;
width:60%;
margin-left:90px;
color:rgb(26, 20, 48);}
p{
text-align:right;
margin-right:20px;
}}
 
&:nth-of-type(2) { 
h1{
font-size:20px;
text-align:left
color:rgb(26, 20, 48);}
p{
text-align:left;
}}

&:nth-of-type(3) {   
h1{
font-size:20px;
text-align:left
color:rgb(26, 20, 48);
}}
 &:nth-of-type(1),
  &:nth-of-type(4) {
    align-items: flex-end;
    text-align: right;
  }

  width: 265px;
  border: none;
  border-radius: 5px;
  height: 200px;
  padding: 10px;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  h1 {
    font-size: 20px;
    color: rgb(26, 20, 48);
    margin: 0;
  }

  p {
    margin-top: 10px
  }

  button {
    width: 120px;
    height: 35px;
    transition: 0.3s;
    background-color: rgb(247, 100, 42);
    color: white;
    border: 2px solid rgb(247, 100, 42);
    border-radius: 10px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    margin-top: auto;
  }

  button:hover {
    background-color: white;
    color: rgb(247, 100, 42);
  }
`;

const CardImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;       /* fill the card */
  height: 100%;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  z-index: 0;
  transition: transform 0.3s ease;

  ${props => props.tilt && `
    &:hover {
      transform: rotate(-3deg) scale(1.05);
    }
  `}
`;





export const Sale=()=>{
return <>

<Combine>

<Rit>
<p>Big Saving Days Sale</p>
<h1>Buy New Trend Women Black Cotton Blend Top | Top for Women</h1>
<div className="two">
<span>Starting at only <em>Rs. 500</em></span>
<button>Shop Now</button>
</div>
</Rit>

<Left>
    <On>
<p>Buy Men's Footwear with low price</p>
<button>Buy now</button>
    </On>
    <To>
<p>Buy Apple Iphone
₹45000</p>
<button>Buy now</button>

    </To>
</Left>
</Combine>
</>

}


export const Seconds=()=>{
return <>
<Com>

<Card bg={girl}>
<h1>Buy Women products with low price</h1>
<p>Rs.999</p>
<button>Shop now</button>
</Card>


<Card bg={bag}>
<h1>Buy Apple Iphone</h1>
<p>Rs.45000</p>
<button>Shop now</button>
</Card>


<Card bg={bm}>
<h1>Buy Men's bags with lowest price</h1>
<p>Rs.900</p>
<button>Shop now</button>
</Card>


<Card bg={sh}>
<h1>Buy Men's Footwear with low prices</h1>
<p>Rs.1500</p>
<button>Shop now</button>
</Card>


</Com>

</>
}

export const Logos = () => {
  return (
    <Com>
      <Card><CardImage bg={fashion} tilt /></Card>
      <Card><CardImage bg={mobile} tilt /></Card>
      <Card><CardImage bg={coke} tilt /></Card>
      <Card><CardImage bg={iphone} tilt /></Card>
    </Com>
  );
};

