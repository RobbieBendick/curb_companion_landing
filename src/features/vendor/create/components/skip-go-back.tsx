import { ArrowRight, ArrowLeft } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import axios from 'axios';
import { useContext, useState } from 'react';
import { CreateVendorContext } from '../create-vendor.context';

export function SkipGoBack({
  handleNext,
  handleBack,
  sendApiCall = false,
}: {
  handleNext?: () => void;
  handleBack?: () => void;
  sendApiCall?: boolean;
}) {
  const { vendor } = useContext(CreateVendorContext);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleApiCall = async () => {
    if (!handleNext) return;

    if (sendApiCall) {
      try {
        let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/landing/create`, vendor);
        if (res.status >= 200 && res.status < 300) {
          handleNext();
        }
      } catch (error: any) {
        console.log('ERROR:', error);
        setErrorMessage(error.message);
      }
      return;
    } else {
      handleNext();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1rem',
      }}
    >
      {errorMessage && (
        <Box sx={{ mt: 1.5, marginInline: 'auto', color: 'red' }}>
          <Typography textAlign="center">{errorMessage}</Typography>
        </Box>
      )}
      {handleNext && (
        <Link
          sx={{ mt: 1.5, marginInline: 'auto', cursor: 'pointer', flexDirection: 'row', display: 'flex' }}
          onClick={handleApiCall}
        >
          Skip
          <ArrowRight />
        </Link>
      )}
      {handleBack && (
        <Link
          sx={{ mt: 1.5, marginInline: 'auto', cursor: 'pointer', flexDirection: 'row', display: 'flex' }}
          onClick={handleBack}
        >
          <ArrowLeft />
          Go Back
        </Link>
      )}
    </Box>
  );
}
