import React, { useState } from "react";
import styled from "styled-components";

const Box = styled.div`
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px dashed #aaa;
`;

const FormGroup = styled.div`
  margin-bottom: 12px;

  label {
    display: block;
    margin-bottom: 6px;
  }

  input {
    width: 80%;
    outline:none;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;

const Button = styled.button`
  padding: 8px 14px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const ChangePasswordForm = () => {
  const [form, setForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    console.log("Password Updated:", form);
    alert("Password changed successfully!");
  };

  return (
    <Box>
      <h4>Change Password</h4>
      <FormGroup>
        <label>Old Password</label>
        <input
          type="password"
          name="current"
          value={form.current}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <label>New Password</label>
        <input
          type="password"
          name="newPass"
          value={form.newPass}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <label>Confirm New Password</label>
        <input
          type="password"
          name="confirm"
          value={form.confirm}
          onChange={handleChange}
        />
      </FormGroup>
      <Button onClick={handleSubmit}>Update Password</Button>
    </Box>
  );
};

export default ChangePasswordForm;
