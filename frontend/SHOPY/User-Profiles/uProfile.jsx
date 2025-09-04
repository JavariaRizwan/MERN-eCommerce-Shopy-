import React, { useState } from "react";
import styled from "styled-components";
import ProfileForm from "./ProfileForm";
import AddressForm from "./AddressForm.jsx";
import ChangePasswordForm from "./ChangePasswordForm";
import user_profile from "../images/user_avatar.avif";
import OrdersList from "./OrdersList";
import Wishlist from "./Wishlist";
import {NavLink} from "react-router-dom"
import Cart from "./cart.jsx";

const Container = styled.div`
  font-family:"Montserrat", sans-serif;
  display: flex;
  padding: 30px;
  font-family: sans-serif;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #f8f8f8;
  border-radius: 10px;
  padding: 20px;
`;

const ProfileInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;

  img {
    width: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;

  li {
    padding: 12px;
    cursor: pointer;
    border-bottom: 1px solid #ddd;

    &:hover {
      background-color: #eee;
    }
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const StyledNavLink=styled(NavLink)`
text-decoration:none;
color:red;
font-size:16px;
margin-left:12px;
position:relative;
top:10px;
font-weight:bold; 
cursor:pointer;
`


const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileForm />;
      case "address":
        return <AddressForm />;
      case "orders":
        return <OrdersList />;
      case "wishlist":
        return <Wishlist />;
        case "cart":
          return <Cart />;
      default:
        return <ProfileForm />;
    }
  };
   const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const isLoggedIn = user && user._id && user.isVerified;

  return (
    <Container>
      <Sidebar>
        <ProfileInfo>
          <img src={user_profile} alt="User" />
          
           
            <h4>{user.fullName}</h4>
          <p>{user.email}</p>
        
          
          </ProfileInfo>
        <SidebarMenu>
          <li onClick={() => setActiveTab("profile")}>My Profile</li>
          <li onClick={() => setActiveTab("address")}>Address</li>
          <li onClick={() => setActiveTab("wishlist")}>My Wishlist</li>
          <li onClick={() => setActiveTab("cart")}>My Cart</li>
          <li onClick={() => setActiveTab("orders")}>My Orders</li>
          <StyledNavLink to="/logout">Logout</StyledNavLink>
        </SidebarMenu>
      </Sidebar>

      <Content>{renderContent()}</Content>
    </Container>
  );
};

export default UserProfile;
