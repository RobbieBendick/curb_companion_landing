import { Box, Card, Typography } from '@mui/material';
import IReview, { IReviewWithID } from 'shared/interfaces/review';
import StarRating from './star-rating';

interface ReviewCardProps {
  review: IReview;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  let dateOfCreation = new Date(review.createdAt);
  let formattedDateOfCreation = dateOfCreation.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return (
    <Card
      key={(review as IReviewWithID)._id}
      sx={{
        paddingInline: '6px',
        paddingBlock: '3px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '300px',
        height: '150px',
      }}
    >
      <Typography fontWeight="bold">{review.title}</Typography>
      <Box display="flex" flexDirection="row" gap="6px">
        <StarRating rating={review.rating} />
        <Typography fontSize="13px">{formattedDateOfCreation}</Typography>
      </Box>

      <Typography fontSize="16px">{review.description}</Typography>
    </Card>
  );
};
