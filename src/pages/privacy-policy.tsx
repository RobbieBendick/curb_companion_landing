import React from 'react';
import { Container, Typography } from '@mui/material';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ padding: '20px' }}>
      <Typography textAlign="center" variant="h4" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography paragraph>Effective Date: 4/01/2024</Typography>
      <Typography paragraph>
        Curb Companion LLC ("Curb Companion," "we," "our," or "us") respects your privacy and is committed to protecting
        it through our compliance with this Privacy Policy. This Privacy Policy describes the types of information we
        may collect from you or that you may provide when you use our mobile application ("App") and our practices for
        collecting, using, maintaining, protecting, and disclosing that information.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Information We Collect
      </Typography>
      <Typography paragraph>
        We collect several types of information from and about users of our App, including:
        <ul>
          <li>
            Information you provide to us: This may include information provided at the time of registering to use our
            App, subscribing to our service, posting material, or requesting further services. The information you
            provide may include your first name, last name, gender, phone number, zip code, address, city, state, and
            email address.
          </li>
          <li>
            Location Information: We may collect information about your location if you enable location services through
            the settings on your mobile device. We use this information to provide you with location-based services such
            as finding nearby food trucks.
          </li>
          <li>
            Usage Information: We may collect information about how you interact with our App, such as the pages or
            content you view, your searches, and other actions you take on the App.
          </li>
        </ul>
      </Typography>
      <Typography variant="h5" gutterBottom>
        How We Use Your Information
      </Typography>
      <Typography paragraph>
        We use information that we collect about you or that you provide to us, including any personal information, for
        the following purposes:
        <ul>
          <li>To present our App and its contents to you.</li>
          <li>To provide you with information, products, or services that you request from us.</li>
          <li>To fulfill any other purpose for which you provide it.</li>
          <li>To notify you about changes to our App or any products or services we offer.</li>
          <li>
            To carry out our obligations and enforce our rights arising from any contracts entered into between you and
            us, including for billing and collection.
          </li>
          <li>To allow you to participate in interactive features on our App.</li>
          <li>For any other purpose with your consent.</li>
        </ul>
      </Typography>
      <Typography variant="h5" gutterBottom>
        Disclosure of Your Information
      </Typography>
      <Typography paragraph>
        We may disclose aggregated information about our users, and information that does not identify any individual,
        without restriction.
      </Typography>
      <Typography paragraph>
        We may disclose personal information that we collect, or you provide as described in this privacy policy:
        <ul>
          <li>To our subsidiaries and affiliates.</li>
          <li>To contractors, service providers, and other third parties we use to support our business.</li>
          <li>To fulfill the purpose for which you provide it.</li>
          <li>For any other purpose disclosed by us when you provide the information.</li>
          <li>With your consent.</li>
        </ul>
      </Typography>
      <Typography variant="h5" gutterBottom>
        Data Security
      </Typography>
      <Typography paragraph>
        We have implemented measures designed to secure your personal information from accidental loss and from
        unauthorized access, use, alteration, and disclosure.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Changes to Our Privacy Policy
      </Typography>
      <Typography paragraph>
        We may update our Privacy Policy from time to time. If we make material changes to how we treat our users'
        personal information, we will post the new Privacy Policy on this page.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Contact Information
      </Typography>
      <Typography paragraph>
        If you have any questions about this Privacy Policy or our practices, please contact us at:
        <br />
        Curb Companion LLC <br />
        1317 Edgewater Dr 6249
        <br />
        Orlando, FL 32804 <br />
        contact@curbcompanion.com <br />
      </Typography>
    </Container>
  );
};

export default PrivacyPolicyPage;
