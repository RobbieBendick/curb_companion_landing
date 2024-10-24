import React from 'react';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box, Typography } from '@mui/material';

interface RatingStarsProps {
  rating: number;
  reviewsLength: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, reviewsLength }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  const stars = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<StarRateIcon key={`full-${i}`} sx={{ color: 'yellow' }} fontSize="small" />);
  }

  // Add half star
  if (halfStar) {
    stars.push(<StarHalfIcon key="half" sx={{ color: 'yellow' }} fontSize="small" />);
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<StarOutlineIcon key={`empty-${i}`} sx={{ color: 'gray' }} fontSize="small" />);
  }

  return (
    <Box display="flex" alignItems="center" marginBottom={1.5}>
      {stars}
      <Typography marginLeft={0.5}>({reviewsLength} reviews)</Typography>
    </Box>
  );
};

export default RatingStars;
