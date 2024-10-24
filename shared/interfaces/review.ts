export default interface IReview {
  userId: string;
  title: string;
  description: string;
  rating: number;
  images: string[];
  isReported?: boolean;
  createdAt: Date;
}

export interface IReviewWithID extends IReview {
  _id: string;
}
