import React, { useState } from "react";
import styled from "styled-components";
import ShowAllProducts from "../product_rendering/showAllProducts";
import { useParams } from "react-router-dom";

// Main Wrapper
const Comb = styled.div`
  width: 95%;
  margin: auto;
  font-family: "Montserrat", sans-serif;
  min-height: 90vh;
  display: flex;
  justify-content: space-between;
`;

// Sidebar
const One = styled.div`
  width: 20%;
  height: 90vh;
`;

// Main Content
const Two = styled.div`
  width: 75%;
margin-top:20px;
  .first {
    height: 45px;
    width: 90%;
    
    display: flex;
    align-content: center;
    justify-content: space-between;
    
    background-color: rgb(241, 237, 237);
    border-radius:5px;
    border:none;
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

const Render=styled.div`
margin-top:30px;
width:100%;
min-height:80vh;

`


// Styled Dropdown
const SortContainer = styled.div`
  width: 100%;
  display:flex;
  justify-content:space-between;
  font-family: "Roboto", sans-serif;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin-top:5px;
`;

const Select = styled.select`
  width: 70%;
  padding: 6px 10px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;

  &:hover {
    border-color: #888;
  }
`;

const AllProducts = () => {
  const {id:categoryId}=useParams();
 
  const [selectedOption, setSelectedOption] = useState("Featured");
  const [productCount, setProductCount] = useState(0); // 👈 count state



  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    console.log("Sorting by:", e.target.value);
    // Implement your sorting logic here
  };

  return (
    <>
      <Comb>
        <One>{/* Sidebar content */}</One>

        <Two>
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


               <Render>

        <ShowAllProducts selectedOption={selectedOption}  setProductCount={setProductCount} categoryId={categoryId}/>
               </Render>

          {/* Render products here */}
        </Two>
      </Comb>




    </>
  );
};

export default AllProducts;
