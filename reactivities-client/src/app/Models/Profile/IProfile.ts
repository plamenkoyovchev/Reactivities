export interface IProfile {
  username: string;
  displayName: string;
  bio: string;
  photo: IPhoto;
  photos: IPhoto[];
  following: boolean;
  followersCount: number;
  followingsCount: number;
}

export interface IPhoto {
  id: string;
  url: string;
  isMain: boolean;
}
