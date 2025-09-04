
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: "Montserrat", sans-serif;
  background-color: #f0f0f0;
`;

const Sidebar = styled.div`
  width: 240px;
  background-color: #1f1f1f;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  color: white;
`;

const SidebarTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 40px;
  text-align: center;
  color: #f8f8f8;
`;

const SidebarLink = styled(NavLink)`
  color: white;
  background-color: #333;
  padding: 12px 20px;
  margin-bottom: 15px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: 0.3s;

  &:hover {
    background-color: #d10043;
  }

  &.active {
    background-color: #d10043;
  }
`;

const Main = styled.div`
  flex: 1;
  padding: 60px 40px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  color: #333;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 14px 24px;
  background-color: #333;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #d10043;
  }
`;

const AdminPanel = () => {
  const handleShowUsers = () => {
    console.log("Show Users");
  };

  const handleShowOrders = () => {
    console.log("Show Orders");
  };

  return (
    <Wrapper>
      <Sidebar>
        <SidebarTitle>Admin Panel</SidebarTitle>
        <SidebarLink to="/admin/add-product">➕ Add Product</SidebarLink>
        <SidebarLink to="/admin/add-category">📂 Add Category</SidebarLink>
        <SidebarLink to="/admin/add-brand">🏷️ Add Brand</SidebarLink>
      </Sidebar>

      <Main>
        <Title>Welcome, Admin 👋</Title>
        <p>You can manage your products, categories, brands, and view orders or users from here.</p>

        <ActionButtons>
          <Button onClick={handleShowUsers}>👥 View Users</Button>
          <Button onClick={handleShowOrders}>📦 View Orders</Button>
        </ActionButtons>
      </Main>
    </Wrapper>
  );
};

export default AdminPanel;
