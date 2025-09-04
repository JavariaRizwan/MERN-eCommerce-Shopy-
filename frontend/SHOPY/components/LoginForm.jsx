

import React, { useState , useEffect} from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const SubmitButton = styled.button`
  padding: 10px;
  background-color: #f2672a;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d35400;
  }
`;
const GoogleButton = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: bold;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
    transform: scale(1.02);
  }

  img {
    width: 20px;
    height: 20px;
  }
`;


const StyledNavLink = styled(NavLink)`
color:rgb(69, 69, 68);
text-decoration:none;
  &:hover {
    color: rgb(247, 100, 42);
    transition: 0.4s;
  }
`;


const LoginForm = () => {

useEffect(() => {
  sessionStorage.removeItem("loggedOut");
}, []);


const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
try {
   const response= await axios.post("/api/login",{
      email:formData.email,
      password:formData.password
    });

const {user, token} =response.data;

localStorage.setItem("user", JSON.stringify(user));
localStorage.setItem("token", JSON.stringify(token));

    window.dispatchEvent(new Event("storage"));


setError("");
    toast.success("Login Successful!");
  navigate("/");
  }

 catch (error) {
   toast.error("Login Failed "+error.message) ; 
}
  }   

  const handleGoogleSignup = () => {
    toast.success("Redirecting to Google Signup (UI only for now)");
  };

  return (
 
<div style={styles.container}>
      <h2 style={styles.h2}>Login to your account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
      
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {/* Password field with correct icon behavior */}
        <div style={styles.inputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.passwordInput}
          />
          <span
            style={styles.icon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <SubmitButton type="submit">Login</SubmitButton>
        <div style={styles.divider}>New to app? <StyledNavLink to="/register">Sign Up</StyledNavLink></div>
        <div style={styles.divider}>or</div>

        {/* Google Button with icon fix */}
        <GoogleButton type="button" onClick={handleGoogleSignup}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            style={styles.googleIcon}
          />
          Login with Google
        </GoogleButton>
      </form>
    </div>
  
  
 
  
  );
};

const styles = {
  container: {
    width: "330px",
    margin: "auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginTop: "50px",
    fontFamily: "'Montserrat',sans-serif",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
  },
  h2: {
    fontSize:"20px",
    textAlign:"center"

  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    outline:"none",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  inputWrapper: {
    position: "relative",
  },
  passwordInput: {
    width: "85%",
    outline:"none",
    padding: "10px 40px 10px 10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  icon: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#555",
    fontSize: "18px",
  },
  divider: {
    textAlign: "center",
    color: "#aaa",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};

export default LoginForm;
