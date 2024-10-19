export interface UserProfile {
  address: string;
  isCreator: boolean;
  creatorSince?: Date;
  craftsUploaded: number;
  username: string;
  bio?: string;
  avatarUrl?: string;
}

