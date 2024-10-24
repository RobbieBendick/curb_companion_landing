import ILocation from './location';

export default interface IEvent {
  place_id?: string;
  title: string;
  ownerId?: string;
  email?: string;
  website?: string;
  phoneNumber?: string;
  image?: string;
  images?: string[];
  views?: number;
  description?: string;
  reviews?: string[];
  rating?: number;
  location: ILocation;
  schedule: string[];
  createdAt?: Date;
}
