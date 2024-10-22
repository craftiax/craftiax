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
    console.log("ExplorerPage useEffect", {
      isConnected,
      profileType,
      explorerId,
      isProfileLoading,
    });

    const init = async () => {
      setIsLoading(true);
      if (!isConnected) {
        console.log("Not connected, redirecting to connect-wallet");
        router.push("/connect-wallet");
      } else if (!isProfileLoading && !profileType) {
        console.log("No profile type, redirecting to profile-select");
        router.push("/profile-select");
      } else if (!isProfileLoading && profileType) {
        try {
          console.log("Fetching user profile for", explorerId);
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
    <div className="bg-gray-900 min-h-screen text-white">
      {userProfile.isCreator ? (
        <CreatorProfile profile={userProfile} />
      ) : (
        <UserProfile profile={userProfile}>
          {/* Banner Image */}
          <div className="relative w-full h-64 mb-8">
            <Image
              src={userProfile.bannerUrl || "/creator-banner.png"}
              alt="Profile Banner"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-900 to-transparent"></div>
          </div>

          {/* Profile Summary */}
          <div className="relative px-6 mb-8">
            <div className="flex items-end -mt-20">
              <Image
                src={userProfile.avatarUrl || "/default-avatar.png"}
                alt={userProfile.username}
                width={150}
                height={150}
                className="rounded-full border-4 border-purple-500"
              />
              <div className="ml-6 pb-4">
                <h1 className="text-4xl font-bold">{userProfile.username}</h1>
                <p className="text-lg text-gray-300">
                  @{userProfile.handle || userProfile.username.toLowerCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">
              About {userProfile.username}
            </h2>
            <p className="text-lg mb-4 italic text-gray-300">
              &ldquo;
              {userProfile.bio || "Crafting the future, one NFT at a time"}
              &rdquo;
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-purple-300">Joined</p>
                <p>
                  {new Date(
                    userProfile.joinDate || Date.now()
                  ).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-purple-300">Favorite Artist</p>
                <p>{userProfile.favoriteArtist || "Exploring new talents"}</p>
              </div>
              <div>
                <p className="text-purple-300">NFTs Collected</p>
                <p>{userProfile.nftsCollected || 0}</p>
              </div>
              <div>
                <p className="text-purple-300">Flares Sent</p>
                <p>{userProfile.flaresSent || 0}</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2 text-purple-400">
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.interests
                  ? userProfile.interests.map(
                      (interest: string, index: number) => (
                        <span
                          key={index}
                          className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      )
                    )
                  : ["Digital Art", "Collectibles", "Virtual Worlds"].map(
                      (interest, index) => (
                        <span
                          key={index}
                          className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      )
                    )}
              </div>
            </div>
          </div>
          {/* ... rest of the UserProfile component ... */}
        </UserProfile>
      )}
    </div>
  );
};

export default ExplorerPage;
