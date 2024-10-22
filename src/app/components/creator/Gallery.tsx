"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaFire, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

interface NFT {
  id: number;
  title: string;
  image: string;
  flaresReceived: number;
  totalUSDC: number;
}

const Gallery = ({ nfts }: { nfts: NFT[] }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const totalPages = Math.ceil(mockNfts.length / itemsPerPage);
  const paginatedNfts = isMobile
    ? mockNfts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : mockNfts;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {paginatedNfts.map((nft) => (
          <NFTCard key={nft.id} nft={nft} isMobile={isMobile} />
        ))}
      </div>
      {isMobile && totalPages > 1 && (
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="mr-2 p-2 bg-gray-700 rounded-full disabled:opacity-50"
          >
            <FaChevronLeft className="text-white" />
          </button>
          <span className="text-white">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="ml-2 p-2 bg-gray-700 rounded-full disabled:opacity-50"
          >
            <FaChevronRight className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

const NFTCard = ({ nft, isMobile }: { nft: NFT; isMobile: boolean }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105">
      <div className={`relative ${isMobile ? "h-32" : "h-48"}`}>
        <Image
          src={nft.image}
          alt={nft.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-2 sm:p-4">
        <h3
          className={`font-semibold mb-1 sm:mb-2 ${isMobile ? "text-xs" : "text-lg"}`}
        >
          {nft.title}
        </h3>
        <div
          className={`flex items-center text-orange-500 mb-1 sm:mb-2 ${isMobile ? "text-xs" : "text-sm"}`}
        >
          <FaFire className="mr-1 sm:mr-2" />
          <span>{nft.flaresReceived} flares</span>
        </div>
        <Link href={`/flare-details/${nft.id}`}>
          <button
            className={`w-full bg-orange-500 text-white py-1 sm:py-2 rounded-md hover:bg-orange-600 transition-colors ${isMobile ? "text-xs" : "text-sm"}`}
          >
            ${nft.totalUSDC} USDC Received
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Gallery;
