import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FlareModal from "./FlareModal";
import { FaFire, FaHeart } from "react-icons/fa";
import styles from "./CraftflareGrid.module.css";

interface CraftflareGridProps {
  crafts: Array<{
    id: string;
    name: string;
    imageUrl: string;
    artist: string;
    artistAddress: string;
    comments: Array<{
      id: string;
      author: string;
      content: string;
      createdAt: string;
    }>;
  }>;
}

const CraftflareGrid: React.FC<CraftflareGridProps> = ({ crafts }) => {
  const [selectedCraft, setSelectedCraft] = useState<null | {
    id: string;
    artist: string;
    artistAddress: string;
  }>(null);

  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>(
    Object.fromEntries(
      crafts.map((craft) => [craft.id, Math.floor(Math.random() * 200) + 1])
    )
  );
  const [likedCrafts, setLikedCrafts] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [flareCounts, setFlareCounts] = useState<{ [key: string]: number }>(
    Object.fromEntries(
      crafts.map((craft) => [craft.id, Math.floor(Math.random() * 100) + 1])
    )
  );

  const [animatingFlare, setAnimatingFlare] = useState<string | null>(null);

  const openFlareModal = (craft: {
    id: string;
    artist: string;
    artistAddress: string;
  }) => {
    setSelectedCraft(craft);
  };

  const closeFlareModal = () => {
    setSelectedCraft(null);
  };

  const handleLike = (craftId: string) => {
    setLikedCrafts((prev) => ({
      ...prev,
      [craftId]: !prev[craftId],
    }));
    setLikeCounts((prev) => ({
      ...prev,
      [craftId]: prev[craftId] + (likedCrafts[craftId] ? -1 : 1),
    }));
  };

  const handleFlareClick = (craftId: string) => {
    setAnimatingFlare(craftId);
    setTimeout(() => setAnimatingFlare(null), 1000); // Reset after animation

    openFlareModal({
      id: craftId,
      artist: crafts.find((c) => c.id === craftId)?.artist || "",
      artistAddress: crafts.find((c) => c.id === craftId)?.artistAddress || "",
    });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
      {crafts.map((craft) => (
        <div
          key={craft.id}
          className="relative group overflow-hidden rounded-lg shadow-lg"
        >
          <Link href={`/craft/${craft.id}`}>
            <div className="aspect-w-1 aspect-h-1 w-full">
              <Image
                src={craft.imageUrl}
                alt={craft.name}
                width={150}
                height={150}
                layout="responsive"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 sm:opacity-0 sm:group-hover:opacity-70 transition-opacity duration-300" />
            <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transform sm:translate-y-full sm:group-hover:translate-y-[-40px] transition-all duration-300">
              <div className="bg-black bg-opacity-50 backdrop-blur-sm p-1.5 sm:p-2.5 rounded">
                <h3 className="text-sm sm:text-base font-semibold truncate">
                  {craft.name}
                </h3>
                <p className="text-xs sm:text-sm truncate">by {craft.artist}</p>
                <p className="text-xs sm:text-sm mt-0.5 sm:mt-1">
                  {craft.comments.length} comments
                </p>
              </div>
            </div>
          </Link>
          <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 z-10 flex items-center space-x-1 sm:space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => handleLike(craft.id)}
              className={`flex items-center space-x-0.5 sm:space-x-1 ${
                likedCrafts[craft.id] ? "bg-pink-600" : "bg-pink-500"
              } hover:bg-pink-600 text-white font-bold py-0.5 sm:py-1 px-1 sm:px-2 rounded-full text-[10px] sm:text-xs`}
            >
              <FaHeart className="text-[8px] sm:text-xs" />
              <span>{likeCounts[craft.id]}</span>
            </button>
            <button
              onClick={() => handleFlareClick(craft.id)}
              className={`flex items-center justify-center space-x-1 sm:space-x-2 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm shadow-lg transform hover:scale-105 transition-all duration-200 ${
                animatingFlare === craft.id ? styles.flareAnimation : ""
              }`}
            >
              <FaFire
                className={`text-sm sm:text-lg ${animatingFlare === craft.id ? styles.fireAnimation : ""}`}
              />
              <span className="font-semibold">Flare</span>
              <span className="text-[8px] sm:text-xs bg-orange-600 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {flareCounts[craft.id]}
              </span>
            </button>
          </div>
        </div>
      ))}
      {selectedCraft && (
        <FlareModal
          isOpen={!!selectedCraft}
          onClose={closeFlareModal}
          craftId={selectedCraft.id}
          artistName={selectedCraft.artist}
          artistAddress={selectedCraft.artistAddress}
        />
      )}
    </div>
  );
};

export default CraftflareGrid;
