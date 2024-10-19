"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import ClientLayout from "../../ClientLayout";
// Assuming the correct paths are as follows:
import CommentSection from "../../components/craftflare/CommentSection";
import TransactionComponents from "@/app/components/TransactionComponents";
// Add this interface above the component
interface Craft {
  id: number;
  title: string;
  artist: string;
  image: string;
  artistAddress: string;
  description: string;
  comments: Array<{
    id: number;
    author: string;
    content: string;
    createdAt: string;
  }>;
}

const CraftPage = () => {
  const { id } = useParams();
  const [craft, setCraft] = useState<Craft | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the craft data from an API
    // For this example, we'll use dummy data
    const dummyCrafts = [
      {
        id: 1,
        title: "Abstract Harmony",
        artist: "Alice Wonder",
        image: "/craftflare1.jpg",
        artistAddress: "0x1234567890123456789012345678901234567890",
        description:
          "A mesmerizing blend of colors and shapes that evoke emotions and spark imagination.",
        comments: [
          {
            id: 1,
            author: "Bob",
            content: "This is absolutely mesmerizing!",
            createdAt: "2023-05-01T12:00:00Z",
          },
          {
            id: 2,
            author: "Charlie",
            content: "The colors are so vibrant, I can't look away!",
            createdAt: "2023-05-02T14:30:00Z",
          },
        ],
      },
      // Add more dummy crafts here...
    ];

    const craftId = Array.isArray(id) ? id[0] : id;
    const foundCraft = dummyCrafts.find((c) => c.id === parseInt(craftId));
    setCraft(foundCraft ?? null);
  }, [id]);

  if (!craft) {
    return <div>Loading...</div>;
  }

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div className="relative h-96">
            <Image
              src={craft.image}
              alt={craft.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2 text-white">
              {craft.title}
            </h1>
            <p className="text-xl text-gray-300 mb-4">by {craft.artist}</p>
            <p className="text-gray-400 mb-6">{craft.description}</p>
            <TransactionComponents></TransactionComponents>
          </div>
        </div>
        <CommentSection comments={craft.comments} />
      </div>
    </ClientLayout>
  );
};

export default CraftPage;
