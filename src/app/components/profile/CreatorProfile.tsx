"use client";

import { useState } from "react";
import CreatorHeader from "../creator/CreatorHeader";
import QuickStats from "../creator/QuickStats";
import NavigationTabs from "../creator/NavigationTabs";
import Gallery from "../creator/Gallery";
import About from "../creator/About";
import Collections from "../creator/Collections";
import FlareActivity from "../creator/FlareActivity";
import Sidebar from "../creator/Sidebar";
import { UserProfile as UserProfileType } from "../../types/UserProfile";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CreatorProfileProps {
  profile: UserProfileType;
}

const CreatorProfile: React.FC<CreatorProfileProps> = ({ profile }) => {
  const router = useRouter();

  const nftsWithTotalUSDC = profile.nfts.map((nft) => ({
    ...nft,
    totalUSDC: nft.flares.reduce((total, flare) => total + flare.usdcAmount, 0),
  }));

  const Gallery = ({ nfts }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nfts.map((nft) => (
        <div key={nft.id} className="bg-gray-800 rounded-lg overflow-hidden">
          <img
            src={nft.image}
            alt={nft.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{nft.title}</h3>
            <Link href={`/flare-details/${nft.id}`}>
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                {nft.totalUSDC} USDC Received
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        {profile.username}'s Creator Profile
      </h1>
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <img
          src={profile.avatarUrl || "/default-avatar.png"}
          alt={profile.username}
          className="w-24 h-24 rounded-full mb-4"
        />
        <p className="text-lg mb-2">{profile.bio || "No bio yet"}</p>
        <p className="text-sm text-gray-400">
          Creator since:{" "}
          {new Date(profile.creatorSince || Date.now()).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-400">
          Crafts uploaded: {profile.craftsUploaded}
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Crafts</h2>
        {profile.craftsUploaded === 0 ? (
          <div>
            <p>You haven't uploaded any crafts yet. Let's get started!</p>
            <div className="flex justify-between mt-4">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
                Upload Your First Craft
              </button>
              <button
                onClick={() => router.push("/creator")}
                className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                Back to Creator Dashboard
              </button>
            </div>
          </div>
        ) : (
          <Gallery nfts={nftsWithTotalUSDC} />
        )}
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Creator Dashboard</h2>
        {/* Add creator-specific features like analytics, earnings, etc. */}
      </div>
    </div>
  );
};

export default CreatorProfile;