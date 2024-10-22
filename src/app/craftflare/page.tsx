"use client";

import CraftflareGrid from "../components/craftflare/CraftflareGrid";
import PopularCreators from "../components/craftflare/PopularCreators";
import FeaturedCollections from "../components/craftflare/FeaturedCollections";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import { useState, useEffect } from "react";

const dummyCrafts = [
  {
    id: "1",
    name: "The dream",
    imageUrl: "/dream.jpg",
    artist: "CryptoArtist",
    artistAddress: "0xFB2C55a36c23eBC9AB642AF5BCdBd24Db9f7C1AA",
    comments: [
      {
        id: "1",
        author: "User1",
        content: "Amazing work!",
        createdAt: "2023-04-01",
      },
      {
        id: "2",
        author: "User2",
        content: "Love the colors!",
        createdAt: "2023-04-02",
      },
    ],
  },
  {
    id: "2",
    name: "Digital Dreamscape",
    imageUrl: "/nft2.jpg",
    artist: "PixelMaster",
    artistAddress: "0x1234567890123456789012345678901234567890",
    comments: [
      {
        id: "1",
        author: "User3",
        content: "Incredible detail!",
        createdAt: "2023-04-03",
      },
      {
        id: "2",
        author: "User4",
        content: "This is groundbreaking!",
        createdAt: "2023-04-04",
      },
    ],
  },
  {
    id: "3",
    name: "Neon Nights",
    imageUrl: "/neon.png",
    artist: "VaporWave",
    artistAddress: "0x9876543210987654321098765432109876543210",
    comments: [
      {
        id: "1",
        author: "User5",
        content: "So vibrant!",
        createdAt: "2023-04-05",
      },
    ],
  },
  {
    id: "4",
    name: "Cosmic Voyage",
    imageUrl: "/nft4.jpg",
    artist: "StarGazer",
    artistAddress: "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
    comments: [
      {
        id: "1",
        author: "User6",
        content: "Out of this world!",
        createdAt: "2023-04-06",
      },
    ],
  },
  {
    id: "5",
    name: "Pixel Paradise",
    imageUrl: "/nft5.jpg",
    artist: "8BitWizard",
    artistAddress: "0x123456789ABCDEF123456789ABCDEF123456789A",
    comments: [
      {
        id: "1",
        author: "User7",
        content: "Nostalgic vibes!",
        createdAt: "2023-04-07",
      },
    ],
  },
  {
    id: "6",
    name: "Africa My Africa",
    imageUrl: "/african.png",
    artist: "ColorMixer",
    artistAddress: "0xFEDCBA9876543210FEDCBA9876543210FEDCBA98",
    comments: [
      {
        id: "1",
        author: "User8",
        content: "A visual symphony!",
        createdAt: "2023-04-08",
      },
    ],
  },
  // ... add more dummy data as needed
];

// interface Artist {
//   name: string;
// }

const CraftflarePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      <div className="flex flex-1">
        {!isMobile && <Sidebar />}
        <main className={`flex-1 ${!isMobile ? "ml-64" : ""} p-4 md:p-8`}>
          <h3 className="text-lg md:text-2xl font-bold mb-4 md:mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
            Discover, Connect and Appreciate Crafts
          </h3>

          {isMobile && (
            <div className="mb-4">
              <select className="w-full bg-gray-800 text-white py-2 px-4 rounded text-sm">
                <option value="">Select Category</option>
                <option value="art">Art</option>
                <option value="collectibles">Collectibles</option>
                <option value="music">Music</option>
                <option value="photography">Photography</option>
                <option value="sports">Sports</option>
                <option value="trading-cards">Trading Cards</option>
                <option value="virtual-worlds">Virtual Worlds</option>
              </select>
            </div>
          )}

          <section className="mb-6 md:mb-12">
            <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-6 text-gray-300">
              Trending Today
            </h2>
            <CraftflareGrid crafts={dummyCrafts} />
          </section>

          <section className="mb-6 md:mb-12">
            <FeaturedCollections />
          </section>

          <section className="mb-6 md:mb-12">
            <PopularCreators />
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CraftflarePage;
