"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import ClientLayout from "@/app/ClientLayout"; // Adjust this import path as needed
import CommentSection from "@/app/components/craftflare/CommentSection";
import ImageModal from "@/app/components/ImageModal";
import FlareModal from "@/app/components/craftflare/FlareModal";
import { FaFire, FaHeart } from "react-icons/fa";
import styles from "@/app/components/craftflare/CraftflareGrid.module.css";

interface Craft {
  id: string;
  title: string;
  artist: string;
  image: string;
  artistAddress: string;
  description: string;
  comments: Array<{
    id: string;
    author: string;
    content: string;
    createdAt: string;
  }>;
}

const CraftPage = () => {
  const { id } = useParams();
  const [craft, setCraft] = useState<Craft | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isFlareModalOpen, setIsFlareModalOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [flareCount, setFlareCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [animatingFlare, setAnimatingFlare] = useState(false);

  useEffect(() => {
    // Fetch craft data (using dummy data for now)
    const dummyCrafts = [
      {
        id: "1",
        title: "The Dream",
        artist: "Alice Wonder",
        image: "/dream.jpg",
        artistAddress: "0x1234567890123456789012345678901234567890",
        description: "Dreams are valid no doubt.",
        comments: [
          {
            id: "1",
            author: "Bob",
            content: "This is absolutely mesmerizing!",
            createdAt: "2023-05-01T12:00:00Z",
          },
          {
            id: "2",
            author: "Charlie",
            content: "The colors are so vibrant, I can't look away!",
            createdAt: "2023-05-02T14:30:00Z",
          },
        ],
      },
      // Add more dummy crafts here...
    ];

    const craftId = Array.isArray(id) ? id[0] : id;
    const foundCraft = dummyCrafts.find((c) => c.id === craftId);
    setCraft(foundCraft ?? null);

    // Set initial like and flare counts
    setLikeCount(Math.floor(Math.random() * 200) + 1);
    setFlareCount(Math.floor(Math.random() * 100) + 1);
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  const handleFlare = () => {
    setAnimatingFlare(true);
    setTimeout(() => setAnimatingFlare(false), 1000);
    setIsFlareModalOpen(true);
    setFlareCount((prevCount) => prevCount + 1);
  };

  if (!craft) {
    return <div>Loading...</div>;
  }

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div
            className="relative w-full h-[400px] cursor-pointer"
            onClick={() => setIsImageModalOpen(true)}
          >
            <Image
              src={craft.image}
              alt={craft.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-t-lg"
            />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2 text-white">
              {craft.title}
            </h1>
            <p className="text-xl text-gray-300 mb-4">by {craft.artist}</p>
            <p className="text-gray-400 mb-6">{craft.description}</p>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 ${
                  isLiked ? "bg-pink-600" : "bg-pink-500"
                } hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full`}
              >
                <FaHeart />
                <span>{likeCount}</span>
              </button>
              <button
                onClick={handleFlare}
                className={`flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 ${
                  animatingFlare ? styles.flareAnimation : ""
                }`}
              >
                <FaFire
                  className={`text-lg ${animatingFlare ? styles.fireAnimation : ""}`}
                />
                <span className="font-semibold">Flare</span>
                <span className="text-xs bg-orange-600 px-2 py-1 rounded-full">
                  {flareCount}
                </span>
              </button>
            </div>
          </div>
        </div>
        <CommentSection comments={craft.comments} />
      </div>
      {isImageModalOpen && (
        <ImageModal
          src={craft.image}
          alt={craft.title}
          onClose={() => setIsImageModalOpen(false)}
        />
      )}
      {isFlareModalOpen && (
        <FlareModal
          isOpen={isFlareModalOpen}
          onClose={() => setIsFlareModalOpen(false)}
          craftId={craft.id}
          artistName={craft.artist}
          artistAddress={craft.artistAddress}
        />
      )}
    </ClientLayout>
  );
};

export default CraftPage;
