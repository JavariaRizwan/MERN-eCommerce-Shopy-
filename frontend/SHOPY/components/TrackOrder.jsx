// TrackOrder.jsx
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  font-family: "Montserrat", sans-serif;
  max-width: 600px;
  margin: 80px auto;
  padding: 40px;
  border-radius: 10px;
  background-color: #fefefe;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  color: #2e2e2e;
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 26px;
  color: #333;
  margin-bottom: 30px;
`;

const InputBox = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;

  input {
    flex: 1;
    padding: 12px 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    color: #444;
    outline: none;
  }

  button {
    padding: 12px 20px;
    background-color: #f2672a;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background-color: #d35400;
    }
  }
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 30px;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 5%;
    right: 5%;
    height: 4px;
    background-color: #ccc;
    z-index: 1;
    transform: translateY(-50%);
  }
`;

const Step = styled.div`
  position: relative;
  text-align: center;
  z-index: 2;

  .circle {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: ${({ active }) => (active ? "#f2672a" : "#ccc")};
    margin: 0 auto 6px;
  }

  .label {
    font-size: 14px;
    color: #444;
  }
`;

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(2); // Let's say 2 = "Shipped"

  const stages = ["Placed", "Processed", "Shipped", "Delivered"];

  return (
    <Container>
      <Heading>Track Your Order</Heading>
      <InputBox>
        <input
          type="text"
          placeholder="Enter your Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button>Track</button>
      </InputBox>

      <ProgressBar>
        {stages.map((stage, index) => (
          <Step key={stage} active={index <= status}>
            <div className="circle" />
            <div className="label">{stage}</div>
          </Step>
        ))}
      </ProgressBar>
    </Container>
  );
};

export default TrackOrder;
