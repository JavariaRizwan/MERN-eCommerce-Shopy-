import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../allFunctionsJS/cartFunctions";


// =================== Styled Components ===================

const Comb = styled.div`
  padding-top: 20px;
  width: 95%;
  margin: auto;
  font-family: "Montserrat", sans-serif;
  min-height: 90vh;
  display: flex;
  justify-content: space-between;
`;

const One = styled.div`
  width: 20%;
  height: 90vh;
`;

const CardScroll = styled.div`
  width: 75%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow-x: hidden;

  .first {
    height: 45px;
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: space-between;
    background-color: rgb(241, 237, 237);
    border-radius: 5px;
    border: none;
    align-items: center;
    padding: 0 10px;
  }

  .to p {
    font-size: 18px;
    letter-spacing: 0.3px;
    margin: 0;
  }

  .on {
    width: 10%;
    display: flex;
    align-items: center;
    padding-left: 20px;

    i {
      font-size: 20px;
      cursor: pointer;
      margin-right: 15px;
    }

    i:hover {
      color: rgb(247, 100, 42);
      transition: 0.4s;
    }
  }

  .btn {
    width: 35%;
  }
`;

const Cards = styled.div`
  height: 340px;
  width: 170px;
  background-color: white;
  border-radius: 5px;
  padding: 0px 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
`;

const Select = styled.select`
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

// =================== Component ===================

const CompleteProducts = () => {
  const cardScrollRef = useRef();
  const [allProducts, setAllProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    axios.get("/api/all-products").then((res) => {
      setAllProducts(res.data);
      setProductCount(res.data.length);
    });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    const sorted = [...allProducts];
    if (value === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (value === "aToZ") {
      sorted.sort((a, b) => a.p_name.localeCompare(b.p_name));
    } else if (value === "zToA") {
      sorted.sort((a, b) => b.p_name.localeCompare(a.p_name));
    }

    setAllProducts(sorted);
  };




  return (
    <Comb>
      <One>{/* Optional sidebar content */}</One>


      <CardScroll ref={cardScrollRef}>
        {/* Sorting + Product Count Header */}
        <div className="first">
          <div className="on">
            <i className="fa-solid fa-bars"></i>
            <i className="fa-solid fa-table-cells-large"></i>
          </div>

          <div className="to">
            <p>There are total {productCount} products</p>
          </div>

          <div className="btn">
            <SortContainer>
              <Label htmlFor="sort">Sort By:</Label>
              <Select id="sort" value={selectedOption} onChange={handleChange}>
                <option value="">Featured</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="aToZ">Name A to Z</option>
                <option value="zToA">Name Z to A</option>
              </Select>
            </SortContainer>
          </div>
        </div>

        {/* Product Cards */}
        {allProducts.map((item) => (
          <Cards key={item._id}>
            <img
              src={`http://localhost:5000/${item.p_image_1.replace(/\\/g, "/")}`}
              className="main-img"
              alt="Main"
            />
            <img
              src={`http://localhost:5000/${(item.p_image_2 || item.p_image_1).replace(/\\/g, "/")}`}
              alt="Hover"
              className="hover-img"
            />
            <StyledNavLink to={`/productLanding/${item._id}`}>
              <h3>
                {item.p_name.length > 30 ? item.p_name.slice(0, 30) + "..." : item.p_name}
              </h3>
            </StyledNavLink>
            <p>Rs. {item.price}</p>
            <button onClick={()=>addToCart(item)}>
              <i className="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>
          </Cards>
        ))}
      </CardScroll>


    </Comb>
  );
};

export default CompleteProducts;
