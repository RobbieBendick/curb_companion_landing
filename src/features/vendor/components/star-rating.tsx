import React from 'react';
import { Star, StarHalf, StarBorder } from '@mui/icons-material';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div>
      {Array.from({ length: fullStars }, (_, index) => (
        <Star key={index} fontSize="5px" />
      ))}
      {halfStar === 1 && <StarHalf fontSize="5px" />}
      {Array.from({ length: emptyStars }, (_, index) => (
        <StarBorder fontSize="5px" key={index} />
      ))}
    </div>
  );
};

export default StarRating;
