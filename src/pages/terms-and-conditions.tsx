import { Box, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled(Box)`
  max-width: 900px;
  margin: 0 auto;
`;

const ContentWrapper = styled(Box)`
  padding: 20px;
`;

const Title = styled(Typography)`
  margin-bottom: 20px;
`;

const Paragraph = styled(Typography)`
  margin-bottom: 10px;
`;

const TermsAndConditionsPage: React.FC = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Title variant="h4" align="center">
          Terms and Conditions for Curb Companion LLC
        </Title>
        <Title variant="h5" align="center" sx={{ marginBlock: 2 }}>
          Welcome to Curb Companion!
        </Title>
        <Paragraph>
          These Terms and Conditions ("Terms") govern your use of the Curb Companion mobile application ("App") provided
          by Curb Companion LLC ("we," "us," or "our"), a company based out of Florida. By accessing or using our App,
          you agree to be bound by these Terms and our Privacy Policy. If you do not agree with any part of these Terms,
          you must not use the App.
        </Paragraph>
        <ol>
          <li>
            <Title variant="h6">Use of the App</Title>
            <Paragraph>
              The App is designed to allow users to view information about food trucks, including names, menus,
              schedules, and other related information. To provide you with location-based services, we may request
              access to your device's location and send notifications to your device. You have the option to disable
              these permissions in your device settings.
            </Paragraph>
          </li>
          <li>
            <Title variant="h6">User Permissions</Title>
            <Paragraph>
              <strong>a. Location Access:</strong> You agree to grant the App permission to access your device's
              location to provide location-based services, including finding food trucks near you.
            </Paragraph>
            <Paragraph>
              <strong>b. Notifications:</strong> By allowing notifications, you agree to receive alerts and updates from
              the App, including food truck schedules and promotions.
            </Paragraph>
          </li>
          <li>
            <Title variant="h6">User Conduct</Title>
            <Paragraph>
              You agree to use the App only for its intended purpose and not to use it for any illegal activities or in
              a way that is harmful to us, other users, or any third party. Misuse of the App may result in termination
              of your access.
            </Paragraph>
          </li>
          <li>
            <Title variant="h6">Intellectual Property</Title>
            <Paragraph>
              All content on the App, including text, graphics, logos, and software, is the property of Curb Companion
              LLC or its content suppliers and protected by United States and international copyright laws.
            </Paragraph>
          </li>
          <li>
            <Title variant="h6">Disclaimers</Title>
            <Paragraph>
              The App and its content are provided on an "as is" basis. Curb Companion LLC does not guarantee the
              accuracy, completeness, or timeliness of the information provided on the App. We disclaim all warranties,
              express or implied, including warranties of merchantability and fitness for a particular purpose.
            </Paragraph>
          </li>
          <li>
            <Title variant="h6">Limitation of Liability</Title>
            <Paragraph>
              Curb Companion LLC shall not be liable for any direct, indirect, incidental, special, or consequential
              damages resulting from the use or inability to use the App.
            </Paragraph>
          </li>
          <li>
            <Title variant="h6">Indemnification</Title>
            <Paragraph>
              You agree to indemnify and hold harmless Curb Companion LLC, its officers, directors, employees, and
              agents from any claims, damages, losses, liabilities, and expenses (including attorneys' fees) arising out
              of your use of the App.
            </Paragraph>
          </li>
          <li>
            <Title variant="h6">Changes to Terms</Title>
            <Paragraph>
              We reserve the right to modify these Terms at any time. Your continued use of the App following any
              changes indicates your acceptance of the new Terms.
            </Paragraph>
          </li>
          <li>
            <Title variant="h6">Governing Law</Title>
            <Paragraph>
              These Terms shall be governed by the laws of the State of Florida, without regard to its conflict of law
              provisions.
            </Paragraph>
          </li>
          <li>
            <Title variant="h6">Contact Us</Title>
            <Paragraph>If you have any questions about these Terms, please contact us at:</Paragraph>
            <Paragraph>
              Curb Companion LLC
              <br />
              1317 Edgewater Dr. #6249
              <br />
              Orlando, FL 32804
              <br />
              Email: contact@curbcompanion.com
            </Paragraph>
            <Paragraph>Effective Date: 3/05/2024</Paragraph>
          </li>
        </ol>
      </ContentWrapper>
    </Wrapper>
  );
};

export default TermsAndConditionsPage;
