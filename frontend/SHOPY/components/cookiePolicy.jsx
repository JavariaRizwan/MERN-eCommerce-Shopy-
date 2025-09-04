import React from "react";
import styled from "styled-components";

const CookieWrapper = styled.div`
  max-width: 900px;
  margin: 50px auto;
  padding: 40px;
  background: #fefefe;
  border: 1px solid #e2e2e2;
  border-radius: 16px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.04);
  font-family: "Helvetica Neue", sans-serif;
  color: #444;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
  color: #222;
`;

const Section = styled.section`
  margin-bottom: 25px;
`;

const SubHeading = styled.h2`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 12px;
`;

const List = styled.ul`
  list-style-type: disc;
  margin-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const CookiePolicy = () => {
  return (
    <CookieWrapper>
      <Title>Cookie Policy</Title>

      <Section>
        <SubHeading>1. What Are Cookies?</SubHeading>
        <Text>
          Cookies are small text files stored on your device when you visit a website.
          They help us enhance your browsing experience and remember your preferences.
        </Text>
      </Section>

      <Section>
        <SubHeading>2. Types of Cookies We Use</SubHeading>
        <List>
          <ListItem><strong>Essential Cookies:</strong> Required for basic website functionality.</ListItem>
          <ListItem><strong>Performance Cookies:</strong> Help us understand how users interact with our website.</ListItem>
          <ListItem><strong>Functional Cookies:</strong> Remember your preferences (like language or region).</ListItem>
          <ListItem><strong>Marketing Cookies:</strong> Track your online activity to show relevant ads.</ListItem>
        </List>
      </Section>

      <Section>
        <SubHeading>3. How We Use Cookies</SubHeading>
        <Text>
          We use cookies to personalize content, analyze traffic, and serve relevant advertisements.
          We may also share information about your use of our site with our analytics and advertising partners.
        </Text>
      </Section>

      <Section>
        <SubHeading>4. Managing Cookies</SubHeading>
        <Text>
          You can control or delete cookies from your browser settings. Note that disabling some cookies
          may affect the functionality of the website.
        </Text>
      </Section>

      <Section>
        <SubHeading>5. Changes to This Cookie Policy</SubHeading>
        <Text>
          We may update our Cookie Policy from time to time. Updates will be posted on this page with the date of revision.
        </Text>
      </Section>

      <Section>
        <SubHeading>6. Contact Us</SubHeading>
        <Text>
          If you have any questions about our Cookie Policy, please contact us at <strong>support@shopy.com</strong>.
        </Text>
      </Section>
    </CookieWrapper>
  );
};

export default CookiePolicy;
