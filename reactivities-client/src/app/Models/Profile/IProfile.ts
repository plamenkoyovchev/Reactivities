export interface IProfile {
  username: string;
  displayName: string;
  bio: string;
  photo: IPhoto;
  photos: IPhoto[];
}

export interface IPhoto {
  id: string;
  url: string;
  isMain: boolean;
}
