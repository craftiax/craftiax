"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ClientLayout from "../ClientLayout";
import CreatorHeader from "../components/creator/CreatorHeader";
import QuickStats from "../components/creator/QuickStats";
import NavigationTabs from "../components/creator/NavigationTabs";
import Gallery from "../components/creator/Gallery";
import About from "../components/creator/About";
import Collections from "../components/creator/Collections";
import FlareActivity from "../components/creator/FlareActivity";
import Sidebar from "../components/creator/Sidebar";

const CreatorProfile = ({ params }) => {
  const [activeTab, setActiveTab] = useState("gallery");
  const { username } = params;
  const router = useRouter();

  // Updated dummy creator data
  const creatorData = {
    name: "Pixel Master",
    username: username,
    tagline: "Creating digital wonders, one pixel at a time",
    profileImage: "/creator-profile.jpg",
    bannerImage: "/creator-banner.jpg",
    isVerified: true,
    stats: {
      followers: 5280,
      nftsCreated: 42,
      totalFlares: 137,
      totalUSDCEarned: 2000,
    },
    joinDate: "2023-01-15",
    bio: "Digital artist exploring the intersection of technology and creativity. Specializing in vibrant, futuristic landscapes and abstract compositions that push the boundaries of digital art.",
    skills: ["Digital Painting", "3D Modeling", "Generative Art", "Animation"],
    socialLinks: {
      twitter: "https://twitter.com/pixelmaster",
      instagram: "https://instagram.com/pixelmaster",
      website: "https://pixelmaster.art",
    },
    nfts: [
      {
        id: 1,
        title: "Cosmic Dreams",
        image: "/nft1.jpeg",
        flaresReceived: 42,
        usdcReceived: 250,
      },
      {
        id: 2,
        title: "Digital Oasis",
        image: "/nft2.jpg",
        flaresReceived: 28,
        usdcReceived: 180,
      },
      {
        id: 3,
        title: "Neon Nights",
        image: "/nft3.jpg",
        flaresReceived: 35,
        usdcReceived: 210,
      },
    ],
    collections: [
      {
        id: 1,
        name: "Neon Dreamscapes",
        coverImage: "/collection1.jpg",
        itemCount: 10,
        totalFlares: 156,
      },
      {
        id: 2,
        name: "Cyberpunk Avatars",
        coverImage: "/collection2.jpg",
        itemCount: 25,
        totalFlares: 342,
      },
      {
        id: 3,
        name: "Abstract Realities",
        coverImage: "/collection3.jpg",
        itemCount: 15,
        totalFlares: 203,
      },
    ],
    flareActivities: [
      {
        id: 1,
        action: "Received 5 flares from @fan1",
        timestamp: "2023-04-01T12:00:00Z",
      },
      {
        id: 2,
        action: "Received 10 flares from @fan2",
        timestamp: "2023-04-02T14:30:00Z",
      },
      {
        id: 3,
        action: "Received 3 flares from @fan3",
        timestamp: "2023-04-03T09:15:00Z",
      },
    ],
  };

  const handleUploadCraft = () => {
    router.push("/upload-craft"); // Adjust this route as needed
  };

  return (
    <ClientLayout>
      <div className="bg-gray-900 min-h-screen text-white">
        <CreatorHeader creator={creatorData}>
          <button
            onClick={handleUploadCraft}
            className="group relative inline-flex items-center overflow-hidden rounded px-8 py-3 bg-orange-500 bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <span className="absolute left-0 -translate-x-full transition-transform group-hover:translate-x-4">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </span>
            <span className="ml-4 transition-all group-hover:ml-8">
              Upload New Craft
            </span>
          </button>
        </CreatorHeader>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4 text-sm text-gray-400">
            Joined: {new Date(creatorData.joinDate).toLocaleDateString()}
          </div>
          <QuickStats stats={creatorData.stats} />
          <div className="flex flex-col lg:flex-row mt-8 gap-8">
            <div className="lg:w-3/4">
              <NavigationTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <div className="mt-6">
                {activeTab === "gallery" && <Gallery nfts={creatorData.nfts} />}
                {activeTab === "about" && <About creator={creatorData} />}
                {activeTab === "collections" && (
                  <Collections collections={creatorData.collections} />
                )}
                {activeTab === "flareActivity" && (
                  <FlareActivity activities={creatorData.flareActivities} />
                )}
              </div>
            </div>
            <Sidebar creator={creatorData} />
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default CreatorProfile;
