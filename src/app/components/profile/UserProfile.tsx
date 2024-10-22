"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import {
  Avatar,
  Identity,
  Name,
  Badge,
  Address,
} from "@coinbase/onchainkit/identity";
// src/app/components/profile/UserProfile.tsx
import ClientLayout from "../../ClientLayout";
import { becomeCreator } from "../../utils/profileUtils";
// Removed the import for UserProfileType due to the error
import { FaBell, FaFire, FaUser, FaEthereum } from "react-icons/fa";
import Image from "next/image";

// Add this interface definition above the UserProfileProps interface
interface UserProfileType {
  username: string;
  address: string;
  avatarUrl?: string;
  bio?: string;
  joinDate?: number;
  isCreator: boolean;
  flaresSent?: number;
  baseEthSpent?: number;
}

interface UserProfileProps {
  profile: UserProfileType;
  children?: React.ReactNode;
}

const UserProfile: React.FC<UserProfileProps> = ({ profile, children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  // Add notifications state
  const [notifications, setNotifications] = useState([
    "You sent a flare to PixelMaster!",
    "CryptoArtist1 appreciated your flare!",
    "New craft from your favorite creator!",
  ]);

  // Dummy data for flare activities
  const [flareActivities, setFlareActivities] = useState([
    {
      id: 1,
      action: "Sent 5 flares to PixelMaster",
      timestamp: "2023-04-15T10:30:00Z",
    },
    {
      id: 2,
      action: "Sent 3 flares to CryptoArtist1",
      timestamp: "2023-04-14T15:45:00Z",
    },
    {
      id: 3,
      action: "Sent 2 flares to DigitalDreamer",
      timestamp: "2023-04-13T09:20:00Z",
    },
  ]);

  // Dummy data for favorite creators
  const [favoriteCreators, setFavoriteCreators] = useState([
    { id: 1, name: "PixelMaster", avatarUrl: "/pixelmaster-avatar.jpg" },
    { id: 2, name: "CryptoArtist1", avatarUrl: "/cryptoartist1-avatar.jpg" },
    { id: 3, name: "DigitalDreamer", avatarUrl: "/digitaldreamer-avatar.jpg" },
  ]);

  const handleCreatorAction = () => {
    if (profile.isCreator) {
      // If already a creator, navigate to the creator page
      router.push("/creator");
    } else {
      // If not a creator, show confirmation
      setShowConfirmation(true);
    }
  };

  const handleConfirmBecomeCreator = async () => {
    setIsLoading(true);
    try {
      await becomeCreator(profile.address);
      // After becoming a creator, navigate to the creator page
      router.push("/creator");
    } catch (error) {
      console.error("Error becoming a creator:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
      setShowConfirmation(false);
    }
  };

  // Dummy bio
  const dummyBio =
    "Web3 enthusiast, NFT Lover, and aspiring digital artist. Exploring the frontiers of decentralized technology and creative expression.";

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Banner Image */}
        <div className="relative h-48 mb-8 rounded-lg overflow-hidden">
          <Image
            src="/banner.jpg"
            alt="Profile Banner"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <Image
              src="/ava.jpeg"
              alt={profile.username}
              width={96}
              height={96}
              className="rounded-full mr-6 border-4 border-orange-500"
            />
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold">
                {profile.username}
              </h1>
              <p className="text-sm sm:text-base text-gray-400">{dummyBio}</p>
            </div>
          </div>
          <button
            onClick={handleCreatorAction}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            {profile.isCreator ? "Go to Creator Dashboard" : "Become a Creator"}
          </button>
        </div>

        {/* User Dashboard */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-b border-gray-700 pb-2">
            Your Dashboard
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            <DashboardCard
              icon={<FaFire className="text-2xl sm:text-3xl" />}
              label="Flares Sent"
              value={profile.flaresSent || 0}
            />
            <DashboardCard
              icon={<FaEthereum className="text-2xl sm:text-3xl" />}
              label="Base ETH Spent"
              value={`${profile.baseEthSpent || 0} ETH`}
            />
            <DashboardCard
              icon={<FaUser className="text-2xl sm:text-3xl" />}
              label="Favorite Creators"
              value={favoriteCreators.length}
            />
            <DashboardCard
              icon={<FaBell className="text-2xl sm:text-3xl" />}
              label="Notifications"
              value={notifications.length}
            />
          </div>
        </div>

        {/* Flare Activity */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-b border-gray-700 pb-2">
            Your Flare Activity
          </h2>
          {flareActivities.length > 0 ? (
            <ul className="space-y-4">
              {flareActivities.map((activity) => (
                <li
                  key={activity.id}
                  className="bg-gray-700 p-3 sm:p-4 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  <p className="text-orange-400 font-semibold text-sm sm:text-base">
                    {activity.action}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm sm:text-base">No flare activity yet.</p>
          )}
        </div>

        {/* Favorite Creators */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-b border-gray-700 pb-2">
            Your Favorite Creators
          </h2>
          {favoriteCreators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {favoriteCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="bg-gray-700 p-3 sm:p-4 rounded-lg flex items-center hover:bg-gray-600 transition-colors duration-200"
                >
                  <Image
                    src={creator.avatarUrl || "/default-avatar.png"}
                    alt={creator.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-3 sm:mr-4"
                  />
                  <p className="text-sm sm:text-lg font-semibold">
                    {creator.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm sm:text-base">
              You haven&apos;t added any favorite creators yet.
            </p>
          )}
        </div>

        {/* Become a Creator CTA */}
        {!profile.isCreator && (
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Ready to share your crafts?
            </h2>
            <button
              onClick={handleConfirmBecomeCreator}
              disabled={isLoading}
              className="bg-orange-500 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-orange-600 transition-colors disabled:bg-gray-500 text-sm sm:text-base"
            >
              {isLoading ? "Processing..." : "Become a Creator"}
            </button>
          </div>
        )}

        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Become a Creator</h2>
              <p className="mb-4">
                Are you sure you want to become a creator? This will enable
                additional features for your account.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBecomeCreator}
                  disabled={isLoading}
                  className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors disabled:bg-gray-500"
                >
                  {isLoading ? "Processing..." : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ClientLayout>
  );
};

interface DashboardCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  label,
  value,
}) => (
  <div className="bg-gray-700 p-3 sm:p-6 rounded-lg flex items-center hover:bg-gray-600 transition-colors duration-200">
    <div className="text-orange-500 mr-3 sm:mr-4">{icon}</div>
    <div>
      <p className="text-xs sm:text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-lg sm:text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default UserProfile;
