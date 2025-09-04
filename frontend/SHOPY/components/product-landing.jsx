
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { addToCart } from "../allFunctionsJS/cartFunctions";

// Styled Components
const All = styled.div`
  width: 95%;
  font-family: "Montserrat", sans-serif;
  margin: 50px auto;
  min-height: 100vh;
  display: flex;
  gap: 20px;
  box-sizing: border-box;
  color: rgb(66, 66, 66);

  h2 {
    font-weight: 600;
    margin-top: 100px;
  }
`;

const First = styled.div`
  width: 10%;
  display: flex;
  gap: 20px;
  flex-direction: column;

  .thumb {
    width: 150px;
    height: 150px;
    cursor: pointer;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
          border-radius:10px;

      transition: 0.3s ease;
    }

    &:hover img {
      opacity: 0.7;
    }
  }
`;

const Left = styled.div`
  width: 45%;

  .ing {
    width: 85%;
    max-height: 600px;
    margin: auto;
    border-radius:10px;
    overflow: hidden;
  }

  img {
    width: 90%;
    height: 70%;
    object-fit: contain;
    border-radius: 5px;
    cursor: zoom-in;
  }
`;

const Right = styled.div`
  width: 35%;
  padding-left: 20px;

  p {
    margin: 20px 0;
  }

  em {
    color: rgb(3, 128, 34);
    font-weight: bold;
  }

  del {
    font-weight: 600;
    font-size: 20px;
  }

  span {
    color: red;
    font-size: 20px;
    font-weight: 600;
    margin-left: 10px;
  }

  .right {
    margin-top: 20px;
  }

  .des {
    letter-spacing: 0.3px;
    line-height: 1.5rem;
    margin: 10px 0;
  }

  .shipping {
    font-weight: 300;
    margin-bottom: 20px;
  }

  .both {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;

    button {
      height: 38px;
      padding: 0 20px;
      background-color: rgb(211, 0, 67);
      color: white;
      border: none;
      font-size: 16px;
      cursor: pointer;
      margin-left: 10px;
      border-radius: 3px;
      transition: background 0.3s;
    }

    button:hover {
      background-color: rgb(169, 3, 56);
    }

    input {
      width: 50px;
      padding-left: 10px;
      height: 40px;
      outline: none;
      font-size: 17px;
    }
  }
`;

const Landing = () => {

const {id}=useParams();

  const [product, setProduct]=useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});
 
useEffect(()=>{
axios.get(`/api/productLanding/${id}`)
.then((res)=>
{
setProduct(res.data);
setSelectedImage(`http://localhost:5000/${res.data.p_image_1}`);
})
.catch((error)=>{
  toast.error("Error fetching products");
})

},[id]) 

if(!product){
  return <p>Loading ...</p>
}


  const handleChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomStyle({
      transform: "scale(2)",
      transformOrigin: `${x}% ${y}%`,
    });
  };

  const resetZoom = () => {
    setZoomStyle({ transform: "scale(1)", transformOrigin: "center" });
  };

  return (
    <All>
      <First>
        <div className="thumb" onClick={() => setSelectedImage(`http://localhost:5000/${product.p_image_1}`)}>
          <img src={`http://localhost:5000/${product.p_image_1}`} alt="Thumbnail 1" />
        </div>
        <div className="thumb" onClick={() => setSelectedImage(`http://localhost:5000/${product.p_image_2}`)}>
          <img src={`http://localhost:5000/${product.p_image_2}`} alt="Thumbnail 2" />
        </div>
      </First>

      <Left>
        <div className="ing">
 {selectedImage && (
  <img
    src={selectedImage}
    alt="Selected Product"
    style={zoomStyle}
    onMouseMove={handleMouseMove}
    onMouseLeave={resetZoom}
  />
)}       </div>
      </Left>

      <Right>
        <h2>{product.p_name}</h2>
        <p>
          Brands: <span>{product.p_brand?.b_name}</span>
        </p>
        <p>
          <del>₹2450</del>
          <span>{product.price}</span>
          <div className="right">
            Available In Stock: <em>{product.quantity} Items</em>
          </div>
        </p>

        <div className="des">
          {product.p_description}
        </div>

        <div className="shipping">
          Free Shipping (Est. Delivery Time 2-3 Days)
        </div>

        <div className="both">
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={handleChange}
            name="quantity"
            id="quantity"
          />
          <button  type="button" onClick={()=>addToCart(product, quantity)}>Add to Cart</button>
        </div>
      </Right>
    </All>
  );
};

export default Landing;
