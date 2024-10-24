import { styled } from '@mui/material';
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const StyledFooter = styled('footer')`
    text-align: center;
    margin-block: 2rem;
    padding: 1rem;

    font-size: 14px;

    a {
      color: #0ea47a;
      text-decoration: underline;
    }
  `;

  return (
    <StyledFooter>
      <div>&#169; {currentYear} Curb Companion LLC</div>
      <div>
        <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-and-conditions">Terms and Conditions</a>
      </div>
    </StyledFooter>
  );
};

export default Footer;
