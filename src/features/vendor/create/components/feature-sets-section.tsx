import { Paper, Typography, Grid, Box } from '@mui/material';
// import { useTheme } from 'styled-components';
// import { WaveDivider } from './wave-divider';
// import { ElevatedCard } from '@/features/landing/landing.components';

// const UserFeatureSet = (): JSX.Element => {
//   return (
//     <Paper elevation={3} style={{ backgroundColor: '#f5f5f5', paddingBottom: '50px', position: 'absolute' }}>
//       <Container maxWidth="xl">
//         <Box py={6} textAlign="center">
//           <Typography variant="h4">User Feature-Set</Typography>
//           <Grid container spacing={6}></Grid>
//         </Box>
//       </Container>
//     </Paper>
//   );
// };

// const VendorFeatureSet = (): JSX.Element => {
//   return (
//     <Paper elevation={3} style={{ backgroundColor: '#f5f5f5', paddingBottom: '50px' }}>
//       <Container maxWidth="xl">
//         <Box py={6} textAlign="center">
//           <Typography variant="h4">Vendor Feature-Set</Typography>
//           <Grid container spacing={6}>
//             {/* Card items for Vendor Feature-Set */}
//           </Grid>
//         </Box>
//       </Container>
//     </Paper>
//   );
// };

export const FeatureSetsSection = (): JSX.Element => {
  return (
    <>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', margin: '2rem 0' }}>
        What We Offer
      </Typography>{' '}
      <Paper style={{ minHeight: '50vh', position: 'relative' }}>
        {/* SVG for the diagonal line */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <line
            x1="100%"
            y1="0"
            x2="0"
            y2="100%"
            style={{
              stroke: 'black', // Line color
              strokeWidth: 4, // Line thickness
            }}
          />
        </svg>

        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          style={{ height: '100%' }}
        >
          <Grid
            item
            sx={{
              position: 'absolute',
              top: '40px',
              left: '0',
            }}
          >
            <Box p={4}>
              <Typography variant="h4">User Features</Typography>
              {/* Add content for User Features */}
            </Box>
          </Grid>
          <Grid
            item
            sx={{
              position: 'absolute',
              top: '160px',
              right: '0',
            }}
          >
            <Box p={4}>
              <Typography variant="h4">Vendor Features</Typography>
              {/* Add content for Vendor Features */}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
