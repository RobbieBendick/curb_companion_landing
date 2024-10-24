import ILocation from './location';

export default interface ILiveHistory {
  address?: string;
  location?: ILocation;
  vendorId?: string;
  start?: Date;
  end?: Date;
}
