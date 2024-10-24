import { Box, Typography } from '@mui/material';
import Mascot from '../assets/curb-companion-mascot.png';

export function FourOhFourPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        mt: 4,
        minHeight: '80vh',
      }}
    >
      <img src={Mascot} alt="Mascot" height={200} width={200} style={{ margin: '0 auto' }} />{' '}
      <Typography textAlign="center" fontSize="24px" mt={3}>
        Sorry! The page that you tried to access doesn't exist.
      </Typography>
    </Box>
  );
}
