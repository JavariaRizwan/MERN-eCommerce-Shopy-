import { useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 360px;
  margin: 60px auto;
  padding: 30px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
  color: #333;
`;

const OtpWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
`;

const OtpInput = styled.input`
  width: 45px;
  height: 50px;
  text-align: center;
  font-size: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: 0.3s;

  &:focus {
    border-color: #4caf50;
  }
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #388e3c;
  }
`;

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (!/^[0-9]?$/.test(val)) return; // Only digits

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text").slice(0, 6);
    if (!/^\d{6}$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    setOtp(newOtp);
    newOtp.forEach((digit, i) => {
      if (inputs.current[i]) inputs.current[i].value = digit;
    });
    inputs.current[5].focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    const email = localStorage.getItem("verifyEmail");

    if (!email) {
      toast.error("No email found. Please register again.");
      return;
    }

    try {
      const res = await axios.post("/api/verify-otp", {
        email,
        otp: fullOtp,
      });

      toast.success(res.data);
      localStorage.removeItem("verifyEmail"); // Clean up email
      navigate("/login"); // Redirect to login
    } catch (err) {
      toast.error(err.response?.data || "OTP verification failed");
    }
  };

  return (
    <Container>
      <Title>Enter 6-Digit OTP</Title>
      <form onSubmit={handleSubmit} onPaste={handlePaste}>
        <OtpWrapper>
          {otp.map((digit, i) => (
            <OtpInput
              key={i}
              maxLength="1"
                value={otp[i]} // ✅ Add this!

              ref={(el) => (inputs.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
            />
          ))}
        </OtpWrapper>
        <Button type="submit">Verify OTP</Button>
      </form>
    </Container>
  );
};

export default VerifyOTP;
