
import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";


const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
`;

const One = styled.div`
  font-family: "Roboto", sans-serif;
  width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  height: 50px;
  line-height: 50px;
  padding: 0px 40px;
  display: flex;
  margin: auto;
  animation: ${slideUp} 0.5s ease-out;
  justify-content: space-between;
  position: relative;

  p {
    margin: 0;
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 14px;
    color: #333;
  }
`;
const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;
const Link = styled(NavLink)`
  background: transparent;
  cursor: pointer;
  border: none;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  letter-spacing: 0.5px;
  color: rgb(59, 58, 58);
  margin-left: 15px;

  &:hover {
    color: rgb(245, 98, 40);
    transition: 0.4s;
  }
`;

const Button = styled.button.attrs({ className: "main-category-btn" })`
  padding: 0px 5px;
  font-size: 16px;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background: rgb(234, 234, 234);
    transition: 0.4s;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  background-color: #fff;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  display: ${({ show }) => (show ? "block" : "none")};
  animation: ${slideUp} 0.3s ease-out;
  z-index: 100;
  flex-direction: column;
  text-align: left;

  a {
    text-align:center;
    display: block;
    line-height:3;
    color: #333;
    font-weight: 600;
    font-size: 14px;
    text-decoration: none;

    &:hover {
      background-color: #f5f5f5;
      color: #f2672a;
    }
  }
`;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get("/api/category");
        setCategories(response.data);
      } catch (error) {
        toast.error("Error fetching Categories " + error.message);
      }
    };
    getCategories();
  }, []);

  return (
    <One>
      
        <DropdownWrapper
    onMouseEnter={() => setShowDropdown(true)}
    onMouseLeave={() => setShowDropdown(false)}
  >

        <Button className="main-category-btn">
          SHOP BY CATEGORIES <i className="fa-solid fa-caret-down"></i>
        </Button>

        <Dropdown show={showDropdown}>
          {categories.map((cat) => (
            <NavLink
              key={cat._id}
              to={`/products_per_category/${cat._id}`}
              onClick={() => setShowDropdown(false)}
            >
              {cat.c_name}
            </NavLink>
          ))}
    
        </Dropdown>
      
      </DropdownWrapper>
    

      <Link to="/all-products">Home</Link>
      {categories.map((cat) => (
        <Link key={cat._id} to={`/products_per_category/${cat._id}`}>
          {cat.c_name}
        </Link>
      ))}
      <p>Free International Delivery</p>
    </One>
  );
};

export default Categories;
