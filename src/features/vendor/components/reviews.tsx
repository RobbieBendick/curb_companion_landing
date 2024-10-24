import { Box, Card, Typography } from '@mui/material';
import IReview from 'shared/interfaces/review';
import { HalfCircleRating } from './half-circle-rating';
import IVendor from 'shared/interfaces/vendor';
import { ReviewCard } from './review-card';

interface ReviewsWidgetProps {
  vendor: IVendor;
}

export const ReviewsWidget: React.FC<ReviewsWidgetProps> = ({ vendor }) => {
  return (
    <Box display="flex" flexDirection="column" paddingBottom="20px">
      <Box>
        <Typography variant="h6" fontWeight="bold">
          Reviews
        </Typography>
        <Typography fontSize="15px">{vendor.reviews.length} reviews</Typography>
      </Box>
      <Box display="flex" flexDirection="row" gap="5px">
        <Card
          sx={{
            display: 'flex',
            width: '100px',
          }}
        >
          <Box display="flex" flexDirection="column" justifyContent="center">
            <HalfCircleRating rating={vendor.rating || 0} />
            <Typography>of 5 stars</Typography>
          </Box>
        </Card>
        {vendor.reviews.map((review: IReview) => {
          return <ReviewCard review={review} />;
        })}
      </Box>
    </Box>
  );
};
