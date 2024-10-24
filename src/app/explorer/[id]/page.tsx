"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import CreatorProfile from "../../components/profile/CreatorProfile";
import { getUserProfile } from "../../utils/profileUtils";
import { useProfile } from "../../hooks/useProfile";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import UserProfile from "../../components/profile/UserProfile";

interface Flare {
  id: string;
  usdcAmount: number; // Add this line
  // Add more properties as needed
}

type UserProfileType = {
  isCreator: boolean;
  username: string;
  handle?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  bio?: string;
  joinDate?: number;
  favoriteArtist?: string;
  nftsCollected?: number;
  flaresSent?: number;
  interests?: string[];
  craftsUploaded: number;
  nfts: { id: string; image: string; title: string; flares: Flare[] }[];
  address: string; // Add this line
};

const ExplorerPage = () => {
  const { address, isConnected } = useAccount();
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const { profileType, isLoading: isProfileLoading } = useProfile();
  const router = useRouter();
  const params = useParams();
  const explorerId = (params?.id as string) ?? "";
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      if (!isConnected) {
        router.push("/connect-wallet");
      } else if (!isProfileLoading && !profileType) {
        router.push("/profile-select");
      } else if (!isProfileLoading && profileType) {
        try {
          const profile = await getUserProfile(explorerId);
          setUserProfile({ ...profile, nfts: [] });
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
      setIsLoading(false);
    };

    if (!isProfileLoading) {
      init();
    }
  }, [isConnected, profileType, explorerId, router, isProfileLoading]);

  if (isLoading || isProfileLoading) {
    return <div>Loading...</div>;
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl font-bold mb-4">
          Please connect your wallet to view this profile
        </h1>
      </div>
    );
  }

  if (!userProfile) {
    return <div>Error loading profile. Please try again.</div>;
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      <UserProfile profile={userProfile}>
        {/* Banner Image */}
        <div className="relative w-full h-80 mb-16">
          <Image
            src={userProfile.bannerUrl || "/default-banner.jpg"}
            alt={userProfile.bannerUrl ? "Profile Banner" : "Default Banner"}
            layout="fill"
            objectFit="cover"
            className="rounded-b-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        </div>

        {/* Profile Summary */}
        <div className="relative px-6 mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-32 md:-mt-24">
            <Image
              src={userProfile.avatarUrl || "/default-avatar.png"}
              alt={userProfile.username}
              width={180}
              height={180}
              className="rounded-full border-4 border-purple-500 shadow-lg mb-4 md:mb-0"
            />
            <div className="md:ml-8 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold">
                {userProfile.username}
              </h1>
              <p className="text-xl text-purple-300">
                @{userProfile.handle || userProfile.username.toLowerCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gray-800 rounded-2xl p-8 mb-12 shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-purple-400">
              About {userProfile.username}
            </h2>
            <p className="text-xl mb-8 italic text-gray-300">
              &ldquo;
              {userProfile.bio || "Crafting the future, one NFT at a time"}
              &rdquo;
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-lg">
              <div className="bg-gray-700 p-4 rounded-xl">
                <p className="text-purple-300 font-semibold mb-2">Joined</p>
                <p>
                  {new Date(
                    userProfile.joinDate || Date.now()
                  ).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-700 p-4 rounded-xl">
                <p className="text-purple-300 font-semibold mb-2">
                  Favorite Artist
                </p>
                <p>{userProfile.favoriteArtist || "Exploring new talents"}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-xl">
                <p className="text-purple-300 font-semibold mb-2">
                  NFTs Collected
                </p>
                <p>{userProfile.nftsCollected || 0}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-xl">
                <p className="text-purple-300 font-semibold mb-2">
                  Flares Sent
                </p>
                <p>{userProfile.flaresSent || 0}</p>
              </div>
            </div>
          </div>

          {/* Become a Creator Button */}
          {!userProfile.isCreator && (
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Become a Creator</h2>
              <p className="text-sm text-gray-400 mb-4">
                Start your journey as a creator and share your unique crafts
                with the world.
              </p>
              <button
                onClick={() => router.push("/creator-aesthetics")}
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                Go to Creator Aesthetics
              </button>
            </div>
          )}
        </div>
      </UserProfile>
    </div>
  );
};

export default ExplorerPage;
