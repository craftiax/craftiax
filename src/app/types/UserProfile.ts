// src/app/types/UserProfile.ts
export interface UserProfile {
  username: string;
  avatarUrl?: string;
  bio?: string;
  creatorSince?: number;
  craftsUploaded: number;
  nfts: Array<{
    id: string;
    title: string;
    image: string;
    flares: Array<{
      usdcAmount: number;
    }>;
  }>;
}
