import { Box, CircularProgress, Typography } from '@mui/material';

export const HalfCircleRating = ({ rating }: { rating: number }) => {
  const percentage = (rating / 5) * 100;

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={percentage} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div">
          {rating.toFixed(1)}
        </Typography>
      </Box>
    </Box>
  );
};
