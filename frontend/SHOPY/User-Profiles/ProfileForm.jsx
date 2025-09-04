import React, { useState } from "react";
import styled from "styled-components";
import ChangePasswordForm from "./ChangePasswordForm";

const Box = styled.div`
  width: 400px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  .mi{
  display:flex;
  justify-content:space-between;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
   width:100%;
   display:flex;
   justify-content:space-between;
  label {
    font-weight: 500;
    margin-top:11px;
  }

  input {
    width: 70%;
    outline:none;
    padding: 8px;
    margin-top: 6px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 18px;
  background-color: tomato;
  color: white;
  border: none;
  letter-spacing:0.3px;
  border-radius: 6px;
  cursor: pointer;
  &:hover{
  background-color:  rgba(244, 68, 37, 1);
  transition:0.4s;
  }
`;

const ToggleButton = styled.button`
  background: none;
  color: #007bff;
  border: none;
  cursor: pointer;
  background-color:green;
  padding:0px 5px;
  height:30px;
  color:white;
  margin-top:10px;
  border:1px solid green;
  border-radius:5px;
  margin-bottom: 15px;
  &:hover{
  background-color:rgba(1, 103, 1, 1);
  transition:0.3s;
  }
`;

const ProfileForm = () => {
  const [user, setUser] = useState(()=>{
   const stored=localStorage.getItem("user");
    return stored? JSON.parse(stored):null;
  });

const isLoggedIn =user && user._id && user.isVerified;


  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <Box>
      <div className="mi">
        <h3>My Profile</h3>
        <ToggleButton onClick={() => setShowPasswordForm(!showPasswordForm)}>
          {showPasswordForm ? "Hide Password Form" : "Change Password"}
        </ToggleButton>
      </div>
      <FormGroup>
        
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={user.fullName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <label>Email</label>
        <input type="email" value={user.email} readOnly />
      </FormGroup>
      <Button>Update Profile</Button>

      {showPasswordForm && <ChangePasswordForm />}
    </Box>
  );
};

export default ProfileForm;
