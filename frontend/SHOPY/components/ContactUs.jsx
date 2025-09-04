import React from "react";
import styled from "styled-components";

const PageWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: center;
  padding: 60px 20px;
  min-height: 80vh;
`;

const Card = styled.div`
  background: white;
  width: 100%;
  max-width: 500px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
`;

const Heading = styled.h2`
  color: #2c3e50;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  padding: 14px 18px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  background-color: #fefefe;

  &:focus {
    outline: none;
    border-color: #5d6d7e;
    box-shadow: 0 0 5px rgba(93, 109, 126, 0.3);
  }
`;

const TextArea = styled.textarea`
  padding: 14px 18px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  resize: vertical;
  min-height: 140px;
  background-color: #fefefe;

  &:focus {
    outline: none;
    border-color: #5d6d7e;
    box-shadow: 0 0 5px rgba(93, 109, 126, 0.3);
  }
`;

const SubmitButton = styled.button`
  align-self: flex-end;
//  background-color: #2c3e50;
  background-color:rgb(228, 6, 95);
  color: white;
  font-size: 16px;
  padding: 12px 28px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    // background-color: #1a242f;
    background-color:rgb(197, 6, 82);
  }
`;

const ContactUs = () => {
  return (
    <PageWrapper>
      <Card>
        <Heading>Contact Us</Heading>
        <ContactForm>
          <InputGroup>
            <Input type="text" placeholder="Your Name" required />
            <Input type="email" placeholder="Your Email" required />
          </InputGroup>
          <Input type="text" placeholder="Subject" required />
          <TextArea placeholder="Your Message..." required />
          <SubmitButton type="submit">Send Message</SubmitButton>
        </ContactForm>
      </Card>
    </PageWrapper>
  );
};

export default ContactUs;
