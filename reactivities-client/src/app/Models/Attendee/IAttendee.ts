export interface IAttendee {
  displayName: string;
  username: string;
  image: string;
  isHost: boolean;
  following?: boolean;
}
