import IImage from './image';
import IReview from './review';

export default interface IMenuItem {
  _id: string | undefined;
  vendorId: string;
  title: string;
  image?: IImage;
  description: string;
  price: number;
  type: string;
  rating: number;
  reviews: IReview[];
  createdAt: Date;
}
