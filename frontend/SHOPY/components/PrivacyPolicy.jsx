import React from "react";
import styled from "styled-components";

const PrivacyPolicyWrapper = styled.div`
  max-width: 900px;
  margin: 60px auto;
  padding: 40px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.07);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: rgba(43, 43, 43, 1);
`;

const Title = styled.h1`
  font-size: 36px;
  text-align: center;
  margin-bottom: 30px;
 
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const Heading = styled.h2`
  font-size: 22px;
  margin-bottom: 10px;
 
`;

const Text = styled.p`
  line-height: 1.7;
  font-size: 16px;
`;

const List = styled.ul`
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const PrivacyPolicy = () => {
  return (
    <PrivacyPolicyWrapper>
      <Title>Privacy Policy</Title>

      <Section>
        <Heading>1. Introduction</Heading>
        <Text>
          We value your privacy and are committed to protecting your personal information.
          This Privacy Policy outlines how we collect, use, and safeguard your data.
        </Text>
      </Section>

      <Section>
        <Heading>2. Information We Collect</Heading>
        <List>
          <ListItem>Personal details like name, email, and contact number.</ListItem>
          <ListItem>Order and payment information.</ListItem>
          <ListItem>Cookies and usage data for improving the experience.</ListItem>
        </List>
      </Section>

      <Section>
        <Heading>3. How We Use Your Information</Heading>
        <List>
          <ListItem>To process orders and transactions.</ListItem>
          <ListItem>To send updates and marketing emails (with consent).</ListItem>
          <ListItem>To improve our website and user experience.</ListItem>
        </List>
      </Section>

      <Section>
        <Heading>4. Data Security</Heading>
        <Text>
          We implement strict security measures including HTTPS, encryption, and access control
          to ensure your personal data is protected at all times.
        </Text>
      </Section>

      <Section>
        <Heading>5. Third-Party Services</Heading>
        <Text>
          We may use third-party tools like payment gateways or analytics providers.
          These tools may collect information in accordance with their own privacy policies.
        </Text>
      </Section>

      <Section>
        <Heading>6. Your Rights</Heading>
        <Text>
          You can access, update, or delete your information at any time by contacting us. You can also opt-out of marketing communications.
        </Text>
      </Section>

      <Section>
        <Heading>7. Changes to This Policy</Heading>
        <Text>
          We may update this Privacy Policy periodically. Changes will be posted on this page with an updated date.
        </Text>
      </Section>

      <Section>
        <Heading>8. Contact Us</Heading>
        <Text>
          If you have any questions about this policy, please reach out to us at <strong>support@shopy.com</strong>.
        </Text>
      </Section>
    </PrivacyPolicyWrapper>
  );
};

export default PrivacyPolicy;
