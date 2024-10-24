import React from 'react';

export const WaveDivider: React.FC<{ color: string }> = ({ color }) => {
  return (
    <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 12.8c145.142 0 254.857 19.2 433.714 19.2C772.57 32 882.286 12.8 1026.43 12.8 1170.57 12.8 1280.29 32 1459.14 32V48H0V12.8z"
        fill={color}
        stroke="none"
      />
    </svg>
  );
};
