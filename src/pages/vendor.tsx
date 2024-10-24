import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, styled } from '@mui/material';
import IVendor from 'shared/interfaces/vendor';
import defaultVendor from '../assets/default_vendor.png';
import defaultVendorDark from '../assets/default_vendor_dark.png';
import { ColorModeContext } from '@/app';
import { MenuWidget } from '@/features/vendor/components/menu-widget';
export function VendorPage() {
  const { vendorID } = useParams<{ vendorID: string }>();
  const [vendor, setVendor] = useState<IVendor | null>(null);

  async function fetchVendor() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vendors/${vendorID}`);
      setVendor(response.data.data);
    } catch (error) {
      console.error('ERROR RETRIEVING VENDOR DATA:', error);
    }
  }

  useEffect(() => {
    fetchVendor();
  }, [vendorID]);

  const { mode } = useContext(ColorModeContext) as any;

  const defaultVendorImages = {
    dark: defaultVendorDark,
    light: defaultVendor,
  };

  const defaultVendorImage = (defaultVendorImages as any)[mode];

  const Wrapper = styled(Box)`
    max-width: 1200px;
    min-height: 100vh;
    padding-inline: 24px;
    margin-inline: auto;
  `;

  return (
    <Wrapper>
      <Box>
        {vendor ? (
          <>
            <img src={defaultVendorImage}></img>
            <Box>
              <Typography fontWeight="bold" fontSize="2rem">
                {vendor.title}
              </Typography>
            </Box>
            <MenuWidget vendor={vendor} />
          </>
        ) : (
          <Typography textAlign="center">Loading...</Typography>
        )}
      </Box>
    </Wrapper>
  );
}
