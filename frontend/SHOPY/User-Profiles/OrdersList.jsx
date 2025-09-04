import React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 500px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const OrdersList = () => {
  return (
    <Box>
      <h3>My Orders</h3>
      <p>🛒 Order history will be shown here.</p>
    </Box>
  );
};

export default OrdersList;
