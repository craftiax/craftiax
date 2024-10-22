import React from "react";
import { dummyCrafts } from "../../data/dummyCrafts";
import CraftDetailClient from "./CraftDetailClient";
import { notFound } from "next/navigation";

interface Craft {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
  artistAddress: string;
  comments: Array<{
    id: string;
    author: string;
    content: string;
    createdAt: string;
  }>;
}

interface EnhancedCraft extends Craft {
  likes: number;
  flares: number;
}

// This function runs on the server
function getCraftById(id: string): EnhancedCraft | null {
  const craft = dummyCrafts.find((c) => c.id === id);
  if (craft) {
    return {
      ...craft,
      likes: 0,
      flares: 0,
    };
  }
  return null;
}

interface Params {
  id: string;
}

export default function CraftDetailPage({ params }: { params: Params }) {
  const { id } = params;
  const craft = getCraftById(id);

  if (!craft) {
    notFound();
  }

  return <CraftDetailClient craftData={craft} />;
}
