"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaHeart, FaFire, FaComment } from "react-icons/fa";
import FlareModal from "../../components/craftflare/FlareModal";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";
import { useAccount } from "wagmi";

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

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

const CraftDetailClient: React.FC<{ craftData: CraftData }> = ({
  craftData,
}) => {
  const [isFlareModalOpen, setIsFlareModalOpen] = useState(false);
  const [likes, setLikes] = useState(craftData.likes);
  const [flares, setFlares] = useState(craftData.flares);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { address } = useAccount();

  useEffect(() => {
    // Load user comments from local storage
    const storedComments = localStorage.getItem(`userComments-${craftData.id}`);
    if (storedComments) {
      setUserComments(JSON.parse(storedComments));
    }
  }, [craftData.id]);

  console.log("Craft data in client component:", craftData);

  const handleLike = () => {
    setLikes(likes + 1);
    // Here you would typically make an API call to update the like count on the server
  };

  const handleFlare = () => {
    setIsFlareModalOpen(true);
  };

  const handleAddComment = () => {
    if (newComment.trim() && address) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: address,
        content: newComment.trim(),
        createdAt: new Date().toISOString(),
      };
      const updatedComments = [...userComments, comment];
      setUserComments(updatedComments);
      localStorage.setItem(
        `userComments-${craftData.id}`,
        JSON.stringify(updatedComments)
      );
      setNewComment("");
    }
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

                {/* Comment Section */}
                <div className="p-4 sm:p-6 border-t border-gray-700">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-orange-500">
                    Comments
                  </h2>

                  {/* Add Comment Section */}
                  <div className="mb-6 sm:mb-8 bg-gray-700 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">
                      Add Your Comment
                    </h3>
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="flex-grow bg-gray-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 text-sm sm:text-base"
                      />
                      <button
                        onClick={handleAddComment}
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-md hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>

                  {/* Existing Comments */}
                  <div className="space-y-3 sm:space-y-4">
                    {[...craftData.comments, ...userComments].map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-gray-700 p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-gray-600"
                      >
                        <div className="flex items-center mb-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                            <span className="text-white font-bold text-xs sm:text-base">
                              {comment.author[0].toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm sm:text-base">
                              {comment.author.slice(0, 6)}...
                              {comment.author.slice(-4)}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(comment.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm sm:text-base">
                          {comment.content}
                        </p>
                      </div>
                    ))}
                  </div>
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
