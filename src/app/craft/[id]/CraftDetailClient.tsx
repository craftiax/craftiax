"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaHeart, FaFire, FaComment } from "react-icons/fa";
import FlareModal from "../../components/craftflare/FlareModal";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

interface CraftData {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
  likes: number;
  flares: number;
  comments: Array<{
    id: string;
    content: string;
    author: string;
    createdAt: string;
  }>;
  artistAddress: string;
}

const CraftDetailClient: React.FC<{ craftData: CraftData }> = ({
  craftData,
}) => {
  const [isFlareModalOpen, setIsFlareModalOpen] = useState(false);
  const [likes, setLikes] = useState(craftData.likes);
  const [flares, setFlares] = useState(craftData.flares);

  console.log("Craft data in client component:", craftData);

  const handleLike = () => {
    setLikes(likes + 1);
    // Here you would typically make an API call to update the like count on the server
  };

  const handleFlare = () => {
    setIsFlareModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <Image
                  src={craftData.imageUrl}
                  alt={craftData.name}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-bold text-white">
                    {craftData.name}
                  </h1>
                  <p className="text-gray-400">by {craftData.artist}</p>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="flex space-x-2">
                    <button
                      onClick={handleLike}
                      className="flex items-center space-x-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-1 px-3 rounded-full text-sm"
                    >
                      <FaHeart className="text-xs" />
                      <span>{likes}</span>
                    </button>

                    <button className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-full text-sm">
                      <FaComment className="text-xs" />
                      <span>{craftData.comments.length}</span>
                    </button>
                  </div>

                  {/* Animated Flare button */}
                  <button
                    onClick={handleFlare}
                    className="flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-semibold py-1 px-4 rounded-full text-sm animate-pulse hover:animate-none transition-all duration-300"
                  >
                    <FaFire className="text-sm" />
                    <span>{flares} Flares</span>
                  </button>
                </div>

                <h2 className="text-2xl font-semibold mb-4 text-white">
                  Comments
                </h2>
                <div className="space-y-4">
                  {craftData.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-gray-700 p-4 rounded-lg"
                    >
                      <p className="font-semibold text-white">
                        {comment.author}
                      </p>
                      <p className="text-gray-300">{comment.content}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        {comment.createdAt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FlareModal
        isOpen={isFlareModalOpen}
        onClose={() => setIsFlareModalOpen(false)}
        craftId={craftData.id}
        artistName={craftData.artist}
        artistAddress={craftData.artistAddress}
      />
    </div>
  );
};

export default CraftDetailClient;
