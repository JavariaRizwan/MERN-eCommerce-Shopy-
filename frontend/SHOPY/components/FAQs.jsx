// src/components/Faq.jsx

import React, { useState } from "react";
import styled from "styled-components";

const FaqWrapper = styled.div`
  max-width: 800px;
  margin: 60px auto;
  padding: 20px;
  font-family: "Montserrat", sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #333;
`;

const FaqItem = styled.div`
  background: #fff;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
  overflow: hidden;
  transition: all 0.3s ease;
`;

const Question = styled.div`
  padding: 20px;
  background: #f9f9f9;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;

  &:hover {
    background: #f1f1f1;
  }
`;

const Answer = styled.div`
  padding: 20px;
  font-size: 16px;
  color: #555;
  line-height: 1.5;
  display: ${({ open }) => (open ? "block" : "none")};
  border-top: 1px solid #eee;
`;

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const faqs = [
    {
      question: "What is SHOPY?",
      answer: "SHOPY is your one-stop online store for fashion, electronics, beauty, and more — all at unbeatable prices!"
    },
    {
      question: "How do I track my order?",
      answer: "You can track your order by visiting the 'Track Order' section under your account menu or from the navigation bar."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 7-day hassle-free return policy. Items must be unused and in original packaging to qualify for returns."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we only ship within Pakistan. International shipping is coming soon!"
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach us via our Help Center, accessible from the top navigation bar or footer."
    },
  ];

  return (
    <FaqWrapper>
      <Title>Frequently Asked Questions</Title>
      {faqs.map((item, index) => (
        <FaqItem key={index}>
          <Question onClick={() => toggleFaq(index)}>
            {item.question}
            <span>{openIndex === index ? "−" : "+"}</span>
          </Question>
          <Answer open={openIndex === index}>{item.answer}</Answer>
        </FaqItem>
      ))}
    </FaqWrapper>
  );
};

export default Faq;
