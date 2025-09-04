import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  max-width: 900px;
  margin: 60px auto;
  padding: 30px;
  background-color: #fdfdfd;
  color: #444;
  line-height: 1.8;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0,0,0,0.06);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 32px;
  color: #333;
  margin-bottom: 30px;
`;

const Section = styled.div`
  margin-bottom: 25px;
`;

const SubTitle = styled.h3`
  color: #2c2c2c;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 15.5px;
  color: #666;
  margin: 0;
`;

const TermsAndConditions = () => {
  return (
    <Wrapper>
      <Title>Terms and Conditions</Title>

      <Section>
        <SubTitle>1. Introduction</SubTitle>
        <Paragraph>
          Welcome to Shopy! These terms and conditions outline the rules and regulations for the use of our website and services. By accessing or using Shopy, you agree to be bound by these terms.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>2. Use of Website</SubTitle>
        <Paragraph>
          You agree to use our website only for lawful purposes. You may not use our site in any way that breaches any applicable laws, or causes harm to any person or business.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>3. Products & Pricing</SubTitle>
        <Paragraph>
          All prices displayed on the site are subject to change without prior notice. We reserve the right to modify or discontinue any product at any time.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>4. User Accounts</SubTitle>
        <Paragraph>
          You are responsible for maintaining the confidentiality of your account credentials. Any activities that occur under your account are your responsibility.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>5. Shipping & Returns</SubTitle>
        <Paragraph>
          We aim to deliver your order within the estimated time, but delays may occur. Return requests must be made within 7 days of delivery.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>6. Intellectual Property</SubTitle>
        <Paragraph>
          All content on this site, including text, images, logos, and graphics, are the property of Shopy and are protected by copyright laws.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>7. Limitation of Liability</SubTitle>
        <Paragraph>
          Shopy shall not be liable for any direct, indirect, or incidental damages arising out of your use or inability to use the site.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>8. Changes to Terms</SubTitle>
        <Paragraph>
          We reserve the right to update these terms at any time. Continued use of the site after any changes means you accept the new terms.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>9. Contact Us</SubTitle>
        <Paragraph>
          If you have any questions about these Terms and Conditions, please contact us at support@shopy.com.
        </Paragraph>
      </Section>
    </Wrapper>
  );
};

export default TermsAndConditions;
