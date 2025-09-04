

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { addToCart } from "../allFunctionsJS/cartFunctions";

// Styled Components
const Divs = styled.div`
  width: 95%;
  font-family: "Roboto", sans-serif;
  margin: auto;
  h1 {
    font-weight: 600;
  }
  p {
    letter-spacing: 0.5px;
    margin-top: -10px;
  }`
;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Right = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 55%;
  overflow: visible;
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 10px;
  margin:0px 15px;
  overflow-x: hidden;
  scroll-behavior: smooth;
  padding: 10px 0;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Btns = styled.button`
  
  padding: 10px;
  border-radius: 20px;
  border: ${(props) => (props.active ? "1px solid orange" : "1px solid gray")};
  background-color: white;
  color: ${(props) => (props.active ? "orange" : "#333")};
  font-weight: 500;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    border: 1px solid orange;
    color: orange;
  }
`;

const Arrow = styled.div`
  position: absolute;
  font-size: 25px;
  background-color: white;
  color: #333;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  &.left {
    left: -25px;
  }
  &.right {
    right: -25px;
  }
  &:hover {
    background-color: #f2672a;
    color: white;
  }
`;

const CardWrapper = styled.div`
  font-family: "Roboto", sans-serif;
  position: relative;
  width: 95%;
  margin: 30px auto;
`;

const CardScroll = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: hidden;
  scroll-behavior: smooth;
  overflow-y: visible;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Cards = styled.div`
  flex: 0 0 auto;
  height: 340px;
  width: 170px;
  background-color: white;
  border-radius: 5px;
  padding: 0px 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
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
  button:hover i {
    color: white;
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

const Nav=styled(NavLink)`
    height: 35px;
    border: 1px solid rgb(98, 98, 98);
    width: 100px;
    color:rgba(36, 35, 35, 1);
    border-radius: 5px;
    font-size: 14px;
    letter-spacing: 0.4px;
    margin-top: 10px;
    cursor: pointer;
    background: transparent;
    text-decoration:none;
    text-align:center;
    line-height:35px;
  &:hover i {
    margin-left: 10px;
    transition: 0.3s;
  }
`


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

const All = styled.div`
  width: 95%;
  margin: auto;
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 25px;
  }
  button {
    height: 35px;
    border: 1px solid rgb(98, 98, 98);
    width: 100px;
    border-radius: 5px;
    font-size: 13px;
    letter-spacing: 0.4px;
    margin-top: 10px;
    cursor: pointer;
    background: transparent;
  }
  button:hover i {
    margin-left: 10px;
    transition: 0.3s;
  }
`;

const CardArrow = styled(Arrow)`
  top: 40%;
`;


const addCart=(product)=>{
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  toast.warn("Please log in first to add items to your Cart.");
  return;
}
console.log("Adding items to cart: ", product);

}



const scroll = (ref, dir, amt = 200) => {
  if (ref?.current) {
    ref.current.scrollLeft += dir === "left" ? -amt : amt;
  }
};

export const Products = () => {
  const cardScrollRef = useRef();
  const categoryScrollRef = useRef();
  const [active, setActive] = useState("All");
 const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/all-products").then((res) => {
      setProducts(res.data);
    });
  }, []);


  // Fetch all categories
  useEffect(() => {

    axios.get("/api/category").then((res) => {

      setCategories(res.data); // [{ _id, name }]
    });
  }, []);

   // Filter products based on selected category
const filteredProducts =
  active === "All"
    ? products
    : products.filter((p) => String(p.p_category) === String(active));



  return (
    <>
      <Divs>
        <Flex>
          <div className="left">
            <h1>Popular Products</h1>
            <p>Do not miss the current offers until the end of March.</p>
          </div>

          <Right>
            <Arrow
              className="left"
              onClick={() => scroll(categoryScrollRef, "left")}
            >
              <FaChevronLeft />
            </Arrow>

            <ScrollContainer ref={categoryScrollRef}>
  <Btns active={active === "All"} onClick={() => setActive("All")}>
    All
  </Btns>

              {categories.map((cat) => (
                <Btns
                  key={cat._id}
                  active={active === cat._id}
                  onClick={() => setActive(cat._id)}
                >
                  {cat.c_name}
                </Btns>
              ))}
            </ScrollContainer>

            <Arrow
              className="right"
              onClick={() => scroll(categoryScrollRef, "right")}
            >
              <FaChevronRight />
            </Arrow>
          </Right>
        </Flex>
      </Divs>

      <CardWrapper>
        <CardArrow
          className="left"
          onClick={() => scroll(cardScrollRef, "left", 260)}
        >
          <FaChevronLeft />
        </CardArrow>

        <CardScroll ref={cardScrollRef}>
          {filteredProducts.map((item) => (
            <Cards key={item._id}>
              <img src={`http://localhost:5000/${item.p_image_1.replace(/\\/g, "/")}`} alt={item.p_name} className="main-img" />
              <img
                src={`http://localhost:5000/${item.p_image_2.replace(/\\/g, "/")}` || item.p_name}
                alt="hover"
                className="hover-img"
              />
              <StyledNavLink to={`/productLanding/${item._id}`}>
                <h3>{item.p_name.length >30 ? item.p_name.slice(0, 30) + "..." : item.p_name}</h3>
              </StyledNavLink>
              <p>{item.price}</p>
              <button onClick={()=>{addToCart(item);  window.dispatchEvent(new Event("storage"));}}>
                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
              </button>
            </Cards>
          ))}
        </CardScroll>

        <CardArrow
          className="right"
          onClick={() => scroll(cardScrollRef, "right", 260)}
        >
          <FaChevronRight />
        </CardArrow>
      </CardWrapper>
    </>
  );
};


export const Latest = () => {
  const cardScrollRef = useRef();
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/latest-products").then((res) => {
      setLatestProducts(res.data);
    });
  }, []);

  return (
    <>


      <All>
        <h1>Latest Products</h1>
        <Nav to="/products_per_category">
          View All <i className="fa-solid fa-arrow-right-long"></i>
        </Nav>
      </All>
      <CardWrapper>
        <CardArrow
          className="left"
          onClick={() => scroll(cardScrollRef, "left", 260)}
        >
          <FaChevronLeft />
        </CardArrow>
        <CardScroll ref={cardScrollRef}>
          {latestProducts.map((item) => (
            <Cards key={item._id}>
              <img   src={`http://localhost:5000/${item.p_image_1.replace(/\\/g, "/")}`} 
 alt={item.p_name} className="main-img" />
              <img
                  src={`http://localhost:5000/${item.p_image_2.replace(/\\/g, "/")}`} 

                alt="hover"
                className="hover-img"
              />
              <StyledNavLink to={`/productLanding/${item._id}`}>
                <h3>{item.p_name.length > 30 ? item.p_name.slice(0, 30) + "..." : item.p_name}</h3>
              </StyledNavLink>
              <p>${item.price}</p>
              <button onClick={()=>{addToCart(item);  window.dispatchEvent(new Event("storage"));}}>
                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
              </button>
            </Cards>
          ))}
        </CardScroll>
        <CardArrow
          className="right"
          onClick={() => scroll(cardScrollRef, "right", 260)}
        >
          <FaChevronRight />
        </CardArrow>
      </CardWrapper>
    </>
  );
};

export const Footwear = () => {
  const cardScrollRef = useRef();
  const [footwearProducts, setFootwearProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/footwear").then((res) => {
      setFootwearProducts(res.data);
    });
  }, []);

  return (
    <>
      <All>
        <h1>Footwear</h1>
        <Nav to="/products_per_category/6873cbf560371b96304952f8">
          View All <i className="fa-solid fa-arrow-right-long"></i>
        </Nav>
      </All>
      <CardWrapper>
        <CardArrow
          className="left"
          onClick={() => scroll(cardScrollRef, "left", 260)}
        >
          <FaChevronLeft />
        </CardArrow>
        <CardScroll ref={cardScrollRef}>
          {footwearProducts.map((item) => (
            <Cards key={item._id}>
   
 
<img src={`http://localhost:5000/${item.p_image_1.replace(/\\/g, "/")}`}
  alt={item.p_name} 
  className="main-img" 
/>
<img
src={`http://localhost:5000/${item.p_image_2.replace(/\\/g, "/")}`} alt="hover"
                className="hover-img"
              />
              <StyledNavLink to={`/productLanding/${item._id}`}>
                <h3>{item.p_name.length > 30 ? item.p_name.slice(0, 30) + "..." : item.p_name}</h3>
              </StyledNavLink>
              <p>${item.price}</p>
              <button onClick={()=>{addToCart(item);  window.dispatchEvent(new Event("storage"));}}>
                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
              </button>
            </Cards>
          ))}
        </CardScroll>
        <CardArrow
          className="right"
          onClick={() => scroll(cardScrollRef, "right", 260)}
        >
          <FaChevronRight />
        </CardArrow>
      </CardWrapper>
    </>
  );
};
