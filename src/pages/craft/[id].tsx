import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaFire, FaHeart, FaComment } from "react-icons/fa";
import FlareModal from "../../app/components/craftflare/FlareModal";

const CraftDetailPage: React.FC = () => {
  const router = useRouter();
  const { craft } = router.query;

  const [isFlareModalOpen, setIsFlareModalOpen] = useState(false);

  if (!craft) {
    return <div>Loading...</div>;
  }

  const craftData = JSON.parse(craft as string);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative aspect-w-16 aspect-h-9">
            <Image
              src={craftData.imageUrl}
              alt={craftData.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{craftData.name}</h1>
            <p className="text-gray-600 mb-4">by {craftData.artist}</p>
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
            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold mb-4">Comments</h2>
              <div className="space-y-4">
                {craftData.comments.map((comment: any) => (
                  <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
                    <p className="font-semibold">{comment.author}</p>
                    <p className="text-gray-700">{comment.content}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {comment.createdAt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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
