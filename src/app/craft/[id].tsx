import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaFire, FaHeart, FaComment } from "react-icons/fa";
import FlareModal from "../components/craftflare/FlareModal";

const CraftDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [craftData, setCraftData] = useState<CraftData | null>(null);
  const [isFlareModalOpen, setIsFlareModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchCraftData(id as string);
    }
  }, [id]);

  const fetchCraftData = async (craftId: string) => {
    try {
      setIsLoading(true);
      // Replace this with your actual API call or data fetching method
      const response = await fetch(`/api/crafts/${craftId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch craft data");
      }
      const data = await response.json();
      setCraftData(data);
    } catch (error) {
      console.error("Error fetching craft data:", error);
      setError("Failed to load craft data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center text-white mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  if (!craftData) {
    return <div className="text-center text-white mt-8">Craft not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative aspect-w-16 aspect-h-9">
            <Image
              src={craftData.imageUrl}
              alt={craftData.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2 text-white">
              {craftData.name}
            </h1>
            <p className="text-gray-400 mb-4">by {craftData.artist}</p>
            <div className="flex items-center space-x-4 mb-6">
              <button className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full">
                <FaHeart />
                <span>{craftData.likes} Likes</span>
              </button>
              <button
                onClick={() => setIsFlareModalOpen(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold py-2 px-4 rounded-full"
              >
                <FaFire />
                <span>{craftData.flares} Flares</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                <FaComment />
                <span>{craftData.comments.length} Comments</span>
              </button>
            </div>
            <CommentSection comments={craftData.comments} />
          </div>
        </div>
      </div>
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

export default CraftDetailPage;

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}
