import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const Box = styled.div`
  width: 500px;
  padding: 25px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    font-weight: 500;
    margin-bottom: 6px;
  }

  input,
  select {
    width: 90%;
    outline: none;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
`;

const RadioGroup = styled.div`
  margin-top: 10px;
  display: flex;
  width: 60%;
  justify-content: space-between;

  label {
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  input {
    width: 15px;
    height: 15px;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  background-color: tomato;
  color: white;
  letter-spacing:0.4px;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover{
  background-color:  rgba(244, 68, 37, 1);
  transition:0.4s;
  }
`;

const AddressForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  
  const [isExisting, setIsExisting]=useState(false);

  const [form, setForm] = useState({
    address: "",
    zip: "",
    province: "",
    state: "",
    phone: "",
    city: "",
    billingMode: "Cash on Delivery",
  });

  useEffect(() => {
    const fetchAddress = async () => {
      if (!user || !user._id) return;

      try {
        const res = await axios.get(`/api/user_details/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data) {
          setForm({
            address: res.data.address || "",
            zip: res.data.zip || "",
            province: res.data.province || "",
            state: res.data.state || "",
            phone: res.data.phone || "",
            city: res.data.city || "",
            billingMode: res.data.billingMode || "Cash on Delivery",
          });
          setIsExisting(true);
        }
      } catch (err) {
        console.error("Address not found or error occurred:", err);
      }
    };

    fetchAddress();
  }, [user, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      toast.error("User not found. Please login again.");
      return;
    }

    try {
      const payload = {
        userId: user._id,
        ...form,
      };

      const response = await axios.post("/api/save_address_details", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Successfully saved user address details!");
    } catch (error) {
      toast.error("Error saving address details: " + error.message);
    }
  };

  return (
    <Box>
      <h3>Shipping / Billing Address</h3>

      <FormGroup>
        <label>Full Address</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="123 Street, Near Landmark"
        />
      </FormGroup>

      <FormGroup>
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="e.g., 03001234567"
        />
      </FormGroup>
<FormGroup>
        <label>State</label>
        <input
          type="text"
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="e.g., Pakistan"
        />
      </FormGroup>
     
      <FormGroup>
        <label>Province</label>
        <input
          type="text"
          name="province"
          value={form.province}
          onChange={handleChange}
          placeholder="e.g., Punjab"
        />
      </FormGroup>

      

      <FormGroup>
        <label>City</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="e.g., Lahore"
        />
      </FormGroup>

 <FormGroup>
        <label>Zip Code</label>
        <input
          type="text"
          name="zip"
          value={form.zip}
          onChange={handleChange}
          placeholder="e.g., 54000"
        />
      </FormGroup>

      <FormGroup>
        <label>Mode of Billing</label>
        <RadioGroup>
          <label>
            <input
              type="radio"
              name="billingMode"
              value="Cash on Delivery"
              checked={form.billingMode === "Cash on Delivery"}
              onChange={handleChange}
            />
            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              name="billingMode"
              value="Online Payment"
              checked={form.billingMode === "Online Payment"}
              onChange={handleChange}
            />
            Online Payment
          </label>
        </RadioGroup>
      </FormGroup>

     <Button onClick={handleSubmit}>
  {isExisting ? "Update Address" : "Save Address"}
</Button>
    </Box>
  );
};

export default AddressForm;
