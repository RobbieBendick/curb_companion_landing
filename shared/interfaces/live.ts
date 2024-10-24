import ILocation from './location';

export default interface ILive {
  location?: ILocation;
  vendorId?: string;
  start?: Date;
}
