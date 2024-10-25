"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ClientLayout from "../ClientLayout";
import CreatorHeader from "../components/creator/CreatorHeader";
import QuickStats from "../components/creator/QuickStats";
import NavigationTabs from "../components/creator/NavigationTabs";
import Gallery from "../components/creator/Gallery";
import About from "../components/creator/About";
import Collections from "../components/creator/Collections";
import FlareActivity from "../components/creator/FlareActivity";
import Sidebar, { SidebarProps } from "../components/creator/Sidebar";
import { CreatorData } from "../components/creator/types";
import { useAccount } from "wagmi";
import { FaChevronDown } from "react-icons/fa";
import { fetchArtistCrafts } from "../utils/firebaseUtils";

type Params = {
  username: string;
};

const CreatorProfile = ({ params }: { params: Params }) => {
  const [activeTab, setActiveTab] = useState("gallery");
  const { username } = params;
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const { isConnected } = useAccount();
  const [selectedCurrency, setSelectedCurrency] = useState("ETH (sepolia)");
  const [creatorData, setCreatorData] = useState<CreatorData>({
    name: "Pixel Master",
    username: username,
    tagline: "Creating digital wonders, one pixel at a time",
    profileImage: "/creator-profile.jpg",
    bannerImage: "/creator-banner.jpg",
    isVerified: true,
    stats: {
      followers: 0,
      nftsCreated: 0,
      totalFlares: 0,
      totalUSDCEarned: 0,
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
        totalUSDC: 250,
      },
      {
        id: 2,
        title: "Digital Oasis",
        image: "/nft2.jpg",
        flaresReceived: 28,
        totalUSDC: 180,
      },
      {
        id: 3,
        title: "Neon Nights",
        image: "/nft3.jpg",
        flaresReceived: 35,
        totalUSDC: 210,
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
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isConnected) {
      router.push("/connect-wallet");
    }
  }, [isConnected, router]);

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        const { crafts, nftsCreated } = await fetchArtistCrafts(username);
        console.log("Fetched crafts:", crafts);
        console.log("NFTs created:", nftsCreated);

        const totalFlares = crafts.reduce(
          (sum, craft) => sum + craft.flaresReceived,
          0
        );
        const totalUSDCEarned = crafts.reduce(
          (sum, craft) => sum + craft.totalUSDC,
          0
        );

        setCreatorData((prevData) => {
          const newData = {
            ...prevData,
            stats: {
              ...prevData.stats,
              nftsCreated,
              totalFlares,
              totalUSDCEarned,
            },
            nfts: crafts,
          };
          console.log("Updated creator data:", newData);
          return newData;
        });
      } catch (error) {
        console.error("Error fetching creator data:", error);
      }
    };

    fetchCreatorData();
  }, [username]);

  const handleUploadCraft = () => {
    router.push("/upload-craft");
  };

  const CurrencyDropdown = ({ selectedCurrency, setSelectedCurrency }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currencies = ["USDC", "ETH", "ETH (sepolia)"];

    return (
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedCurrency}
            <FaChevronDown className="ml-2 h-5 w-5" />
          </button>
        </div>
        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {currencies.map((currency) => (
                <button
                  key={currency}
                  className={`${
                    currency === "ETH (sepolia)"
                      ? "text-white"
                      : "text-gray-400"
                  } block px-4 py-2 text-sm w-full text-left hover:bg-gray-700 ${
                    currency === selectedCurrency ? "bg-gray-700" : ""
                  }`}
                  role="menuitem"
                  onClick={() => {
                    setSelectedCurrency(currency);
                    setIsOpen(false);
                  }}
                  disabled={currency !== "ETH (sepolia)"}
                >
                  {currency}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <ClientLayout>
      <div className="bg-gray-900 min-h-screen text-white">
        <CreatorHeader creator={creatorData}>
          <button
            onClick={handleUploadCraft}
            className="group relative inline-flex items-center overflow-hidden rounded px-4 py-2 bg-orange-500 bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm md:text-base"
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
        <div className="container mx-auto px-4 py-4">
          <CurrencyDropdown
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
          />
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4 text-sm text-gray-400">
            Joined: {new Date(creatorData.joinDate).toLocaleDateString()}
          </div>
          <QuickStats stats={creatorData.stats} currency={selectedCurrency} />
          <div
            className={`flex ${isMobile ? "flex-col" : "flex-row"} mt-8 gap-8`}
          >
            <div className={isMobile ? "w-full" : "w-3/4"}>
              <NavigationTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isMobile={isMobile}
              />
              <div className="mt-6">
                {activeTab === "gallery" && (
                  <Gallery
                    nfts={creatorData.nfts}
                    selectedCurrency={selectedCurrency}
                  />
                )}
                {activeTab === "about" && <About creator={creatorData} />}
                {activeTab === "collections" && (
                  <Collections collections={creatorData.collections} />
                )}
                {activeTab === "flareActivity" && (
                  <FlareActivity activities={creatorData.flareActivities} />
                )}
              </div>
            </div>
            {!isMobile && <Sidebar creator={creatorData} />}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default CreatorProfile;
