
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 600px;
  margin: 30px auto;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 8px;
  font-family: "Montserrat", sans-serif;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  label {
    margin-bottom: 5px;
    font-weight: 600;
    color: #555;
  }

  input,
  textarea,
  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
    outline: none;

    &:focus {
      border-color: #d10043;
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

const Button = styled.button`
  background-color: #d10043;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  border-radius: 4px;

  &:hover {
    background-color: #b20038;
  }
`;

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    p_name: "",
    p_description: "",
    p_category: "",
    p_brand: "",
    tags: "",
    p_image_1: null,
    p_image_2: null,
    price: "",
    p_quantity: "",
    size: "",
    color: "",
  });

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }

      await axios.post("/api/admin/add-product", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({
        p_name: "",
        p_description: "",
        p_category: "",
        p_brand: "",
        tags: "",
        p_image_1: null,
        p_image_2: null,
        price: "",
        p_quantity: "",
        size: "",
        color: "",
      });

      toast.success("Product has been successfully added!");
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
  };

  return (
    <Container>
      <Title>Add New Product</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Product Name</label>
          <input type="text" name="p_name" value={formData.p_name} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <label>Description</label>
          <textarea name="p_description" value={formData.p_description} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <label>Tags (comma separated)</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <label>Category ID</label>
          <input type="text" name="p_category" value={formData.p_category} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <label>Brand ID</label>
          <input type="text" name="p_brand" value={formData.p_brand} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <label>Image 1</label>
          <input type="file" name="p_image_1" onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <label>Image 2</label>
          <input type="file" name="p_image_2" onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <label>Price (in Rs.)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <label>Quantity</label>
          <input type="number" name="p_quantity" value={formData.p_quantity} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <label>Size</label>
          <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="e.g. Small, Medium" />
        </FormGroup>

        <FormGroup>
          <label>Color</label>
          <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="e.g. Red, Blue" />
        </FormGroup>

        <Button type="submit">Add Product</Button>
      </form>
    </Container>
  );
};

export default AddProduct;
