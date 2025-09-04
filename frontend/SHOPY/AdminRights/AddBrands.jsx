import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: #f1f1f1;
  border-radius: 8px;
  font-family: "Montserrat", sans-serif;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    font-weight: 600;
    margin-bottom: 5px;
    color: #444;
  }

  input {
    padding: 10px;
    font-size: 15px;
    border-radius: 4px;
    border: 1px solid #ccc;

    &:focus {
      border-color: #d10043;
      outline: none;
    }
  }
`;

const Button = styled.button`
  margin-top: 20px;
  background-color: #d10043;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #b20038;
  }
`;

const AddBrands = () => {
const navigate=useNavigate();

  const [b_name, setBName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response=await axios.post("/api/admin/add-brand",{
      b_name
      });
      setBName("");
      toast.success("Brand has been added!");
      navigate("/admin");

    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
  };

  return (
    <Container>
      <Title>Add Brand</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Brand Name</label>
          <input
            type="text"
            value={b_name}
            onChange={(e) => setBName(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">Add Brand</Button>
      </form>
    </Container>
  );
};

export default AddBrands;
