import React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 500px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const Wishlist = () => {
  return (
    <Box>
      <h3>My Wishlist</h3>
      <p>❤️ All your saved products will appear here.</p>
    </Box>
  );
};

export default Wishlist;
