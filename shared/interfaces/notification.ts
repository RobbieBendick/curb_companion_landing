export default interface INotification {
  title: string;
  body: string;
  route: string;
  imageUrl?: string;
  userId: string;
  read: boolean;
  createdAt: Date;
}
