// src/app/components/creator/types.ts

export interface CreatorData {
  name: string;
  username: string;
  tagline: string;
  profileImage: string;
  bannerImage: string;
  isVerified: boolean;
  stats: {
    followers: number;
    nftsCreated: number;
    totalFlares: number;
    totalUSDCEarned: number;
  };
  joinDate: string;
  bio: string;
  skills: string[];
  socialLinks: {
    twitter: string;
    instagram: string;
    website: string;
  };
  nfts: Array<{
    id: number;
    title: string;
    image: string;
    flaresReceived: number;
    totalUSDC: number;
  }>;
  collections: Array<{
    id: number;
    name: string;
    coverImage: string;
    itemCount: number;
    totalFlares: number;
  }>;
  flareActivities: Array<{
    id: number;
    action: string;
    timestamp: string;
  }>;
}
