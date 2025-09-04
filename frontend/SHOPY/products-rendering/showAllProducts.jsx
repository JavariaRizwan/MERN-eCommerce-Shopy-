import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../allFunctionsJS/cartFunctions";

// Styled Components (Card Layout)

const CardScroll = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow-x: hidden;                  // ✅ Adds space between cards
  
`;
const Cards = styled.div`
  height: 340px;
  width: 170px;
  background-color: white;
  border-radius: 5px;
  padding: 0px 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
   
  border: 1px solid rgba(0, 0, 0, 0.2);
  position: relative;
  transition: 0.2s;
  cursor: pointer;
  .main-img,
  .hover-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.3s ease;
  }

  .hover-img {
    opacity: 0;
  }

  &:hover .hover-img {
    opacity: 1;
  }

  &:hover .main-img {
    opacity: 0;
  }


  p {
    color: #f2672a;
    font-weight: bold;
    font-size: 16px;
  }
  i {
    color: #f2672a;
  }
  button {
    cursor: pointer;
    border: 1px solid #f2672a;
    background: transparent;
    color: #f2672a;
    height: 30px;
    width: 95%;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin: auto;
  }
  button:hover {
    background-color: #f2672a;
    color: white;
  }
  button:hover i{
    color: White;
  }

  h3 {
    font-size: 16px;
    font-weight: 500;
    margin-top: 210px;
    margin-bottom: 5px;
    height: 32px;
  }
  h3:hover {
    color: rgb(253, 102, 37);
  }


`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  h3 {
    font-size: 16px;
    font-weight: 500;
    margin-top: 210px;
    margin-bottom: 5px;
    height: 32px;
  }

  h3:hover {
    color: rgb(253, 102, 37);
  }
`;

const ShowAllProducts = ({selectedOption, setProductCount, categoryId}) => {
  const [products, setProducts] = useState([]);
  const cardScrollRef = useRef(null);



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/product_per_category/${categoryId}`); 
              let sortedData=[...response.data];
              switch(selectedOption){
                case "lowToHigh":
                  sortedData.sort((a,b)=>a.price - b.price);
                  break;
                  case "highToLow":
                    sortedData.sort((a,b)=>b.price - a.price);
                    break;
                    case "aToZ":
                      sortedData.sort((a,b)=>a.p_name.localeCompare(b.p_name));
                      break;
                      case "zToA":
                      sortedData.sort((a,b)=>b.p_name.localeCompare(a.p_name));
                      break;
                    default:
                      break;
                    }
        console.log("Fetched Products:", sortedData);

              setProducts(sortedData);
 if (setProductCount) {
          setProductCount(sortedData.length);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
if(categoryId){
    fetchProducts();}
  }, [categoryId, selectedOption, setProductCount]);




  return (
    <CardScroll ref={cardScrollRef}>
          {products.map((item) => (
            <Cards key={item._id}>
<img
  src={`http://localhost:5000/${item.p_image_1.replace(/\\/g, "/")}`} className="main-img"/>
              <img
  src={`http://localhost:5000/${(item.p_image_2 || item.p_image_1).replace(/\\/g, "/")}`}
                alt="hover"
                className="hover-img"
              />
              <StyledNavLink to={`/productLanding/${item._id}`}>
  <h3>
     {item.p_name.length > 30 ? item.p_name.slice(0, 30) + "..." : item.p_name}
  </h3>
</StyledNavLink>
              <p>{item.price}</p>
              <button onClick={()=>{addToCart(item);  window.dispatchEvent(new Event("storage"));}}>
                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
              </button>
            </Cards>
          ))}
        </CardScroll>

  );
};

export default ShowAllProducts;
