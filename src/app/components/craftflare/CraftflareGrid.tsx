import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FlareModal from "./FlareModal";
import { FaFire, FaHeart } from "react-icons/fa";
import styles from "./CraftflareGrid.module.css"; // We'll create this file for custom animations

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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
              <h3 className="text-sm font-semibold truncate">{craft.name}</h3>
              <p className="text-xs truncate">by {craft.artist}</p>
            </div>
          </Link>
          <div className="absolute top-1 right-1 z-10 flex items-center space-x-1">
            <button
              onClick={() => handleLike(craft.id)}
              className={`flex items-center ${
                likedCrafts[craft.id] ? "bg-pink-600" : "bg-pink-500"
              } hover:bg-pink-600 text-white font-bold py-1 px-1.5 rounded-full text-xs`}
            >
              <FaHeart className="text-xs" />
              <span className="ml-1 text-xs">{likeCounts[craft.id]}</span>
            </button>
            <button
              onClick={() => handleFlareClick(craft.id)}
              className={`flex items-center bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold py-1 px-1.5 rounded-full text-xs shadow-lg transform hover:scale-105 transition-all duration-200 ${
                animatingFlare === craft.id ? styles.flareAnimation : ""
              }`}
            >
              <FaFire
                className={`text-xs ${animatingFlare === craft.id ? styles.fireAnimation : ""}`}
              />
              <span className="ml-1 text-xs">{flareCounts[craft.id]}</span>
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
