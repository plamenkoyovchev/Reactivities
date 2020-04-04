export interface IProfile {
  username: string;
  displayName: string;
  bio: string;
  image: string;
  photos: IPhoto[];
}

export interface IPhoto {
  id: string;
  url: string;
  isMain: boolean;
}
