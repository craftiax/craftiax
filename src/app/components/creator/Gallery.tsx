import { useState } from "react";
import Image from "next/image";
import { FaFire } from "react-icons/fa";
import SendFlareTransaction from "./SendFlareTransaction";
import Link from "next/link";

interface NFT {
  id: number;
  title: string;
  image: string;
  flaresReceived: number;
  totalUSDC: number;
}

const Gallery = ({ nfts }: { nfts: NFT[] }) => {
  // Mock data with added USDC totals
  const mockNfts = [
    {
      id: 1,
      title: "Cosmic Dreams",
      image: "/nft1.jpg",
      flaresReceived: 42,
      totalUSDC: 250,
    },
    {
      id: 2,
      title: "Digital Oasis",
      image: "/nft2.jpg",
      flaresReceived: 28,
      totalUSDC: 180,
    },
    {
      id: 3,
      title: "Neon Nights",
      image: "/nft3.jpg",
      flaresReceived: 35,
      totalUSDC: 210,
    },
    {
      id: 4,
      title: "Ethereal Echo",
      image: "/nft4.jpg",
      flaresReceived: 50,
      totalUSDC: 300,
    },
    {
      id: 5,
      title: "Pixel Paradise",
      image: "/nft5.jpg",
      flaresReceived: 38,
      totalUSDC: 225,
    },
    {
      id: 6,
      title: "Quantum Quasar",
      image: "/nft6.jpg",
      flaresReceived: 45,
      totalUSDC: 270,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockNfts.map((nft) => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  );
};

const NFTCard = ({ nft }: { nft: NFT }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48">
        <Image
          src={nft.image}
          alt={nft.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{nft.title}</h3>
        <div className="flex items-center text-orange-500 mb-2">
          <FaFire className="mr-2" />
          <span>{nft.flaresReceived} flares</span>
        </div>
        <Link href={`/flare-details/${nft.id}`}>
          <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors">
            ${nft.totalUSDC} USDC Received
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Gallery;
