import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Wrapper = styled.div`
  max-width: 900px;
  margin: 60px auto;
  padding: 0 20px;
  font-family: "Montserrat", sans-serif;
  color: #333;
`;

const Heading = styled.h1`
  font-size: 32px;
  text-align: center;
  margin-bottom: 10px;
`;

const SubText = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 40px;
`;

const Topic = styled.div`
  margin-bottom: 25px;
`;

const TopicHeader = styled.div`
  background-color: #f5f5f5;
  padding: 15px 20px;
  border-radius: 5px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #eaeaea;
  }
`;

const TopicContent = styled.div`
  background: #fff;
  padding: 15px 20px;
  border: 1px solid #ddd;
  border-top: none;
  font-size: 15px;
  line-height: 1.6;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const helpTopics = [
    {
      title: "Order Issues",
      content:
        "Need help with a recent order? You can track orders, cancel them, or report a problem in your Shopy dashboard under 'My Orders'.",
    },
    {
      title: "Shipping Information",
      content:
        "Orders are usually delivered within 2–4 working days. You'll receive a tracking link once shipped.",
    },
    {
      title: "Returns & Refunds",
      content:
        "Changed your mind? You can return items within 7 days of delivery. Refunds are processed after quality check.",
    },
    {
      title: "Payments & Billing",
      content:
        "We accept credit/debit cards, COD, and UPI. If you're facing payment failures, retry or check your bank.",
    },
    {
      title: "Account Management",
      content:
        "Want to update your info or reset your password? Visit the 'My Account' section for all profile-related actions.",
    },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Wrapper>
      <Heading>Need Help?</Heading>
      <SubText>Welcome to Shopy Help Center. Choose a topic to get started:</SubText>

      {helpTopics.map((topic, index) => (
        <Topic key={index}>
          <TopicHeader onClick={() => toggle(index)}>
            {topic.title}
            {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
          </TopicHeader>
          {openIndex === index && <TopicContent>{topic.content}</TopicContent>}
        </Topic>
      ))}
    </Wrapper>
  );
};

export default HelpCenter;
