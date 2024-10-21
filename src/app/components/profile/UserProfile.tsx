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

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8 bg-black text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{profile.username} Profile</h1>
          <button
            onClick={handleCreatorAction}
            className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            {profile.isCreator ? "Go to Creator Dashboard" : "Become a Creator"}
          </button>
        </div>

        {/* User Info */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <img
            src={profile.avatarUrl || "/default-avatar.png"}
            alt={profile.username}
            className="w-24 h-24 rounded-full mb-4"
          />
          <p className="text-lg mb-2">{profile.bio || "No bio yet"}</p>
          <p className="text-sm text-gray-400">
            Joined:{" "}
            {new Date(profile.joinDate || Date.now()).toLocaleDateString()}
          </p>
        </div>

        {/* User Dashboard */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard
              icon={<FaFire />}
              label="Flares Sent"
              value={profile.flaresSent || 0}
            />
            <DashboardCard
              icon={<FaEthereum />}
              label="Base ETH Spent"
              value={`${profile.baseEthSpent || 0} ETH`}
            />
            <DashboardCard
              icon={<FaUser />}
              label="Favorite Creators"
              value={favoriteCreators.length}
            />
            <DashboardCard
              icon={<FaBell />}
              label="Notifications"
              value={notifications.length}
            />
          </div>
        </div>

        {/* Flare Activity */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Flare Activity</h2>
          {flareActivities.length > 0 ? (
            <ul className="space-y-4">
              {flareActivities.map((activity) => (
                <li key={activity.id} className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-orange-400">{activity.action}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No flare activity yet.</p>
          )}
        </div>

        {/* Favorite Creators */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Favorite Creators</h2>
          {favoriteCreators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="bg-gray-700 p-4 rounded-lg flex items-center"
                >
                  <Image
                    src={creator.avatarUrl || "/default-avatar.png"}
                    alt={creator.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <p className="text-lg">{creator.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>You haven not added any favorite creators yet.</p>
          )}
        </div>

        {/* Become a Creator CTA */}
        {!profile.isCreator && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              Ready to share your crafts?
            </h2>
            <button
              onClick={handleConfirmBecomeCreator}
              disabled={isLoading}
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors disabled:bg-gray-500"
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
        {children}
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
  <div className="bg-gray-700 p-4 rounded-lg flex items-center">
    <div className="text-orange-500 text-2xl mr-4">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default UserProfile;
