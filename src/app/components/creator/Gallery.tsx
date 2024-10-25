"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaFire, FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";
import Link from "next/link";
import { fetchArtistCrafts } from "../../utils/firebaseUtils";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

interface NFT {
  id: string;
  name: string;
  image: string;
  flaresReceived: number;
  likes: number;
  totalUSDC: number;
}

const Gallery = ({ selectedCurrency }) => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const { address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (address) {
        const fetchedNfts = await fetchArtistCrafts(address);
        setNfts(fetchedNfts);
      }
    };
    fetchNFTs();
  }, [address]);

  const totalPages = Math.ceil(nfts.length / itemsPerPage);
  const paginatedNfts = isMobile
    ? nfts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : nfts;

  return (
    <div>
      {nfts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-300 mb-4">
            You haven&apos;t uploaded any crafts yet.
          </p>
          <button
            onClick={() => router.push("/upload-craft")}
            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Upload Your First Craft
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {paginatedNfts.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              isMobile={isMobile}
              selectedCurrency={selectedCurrency}
            />
          ))}
        </div>
      )}
      {isMobile && nfts.length > 0 && totalPages > 1 && (
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

const NFTCard = ({
  nft,
  isMobile,
  selectedCurrency,
}: {
  nft: NFT;
  isMobile: boolean;
  selectedCurrency: string;
}) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105">
      <div className={`relative ${isMobile ? "h-32" : "h-48"}`}>
        <Image src={nft.image} alt={nft.name} layout="fill" objectFit="cover" />
      </div>
      <div className="p-2 sm:p-4">
        <h3
          className={`font-semibold mb-1 sm:mb-2 ${isMobile ? "text-xs" : "text-lg"}`}
        >
          {nft.name}
        </h3>
        <div
          className={`flex items-center justify-between text-orange-500 mb-1 sm:mb-2 ${isMobile ? "text-xs" : "text-sm"}`}
        >
          <div className="flex items-center">
            <FaFire className="mr-1 sm:mr-2" />
            <span>{nft.flaresReceived || 0} flares</span>
          </div>
          <div className="flex items-center">
            <FaHeart className="mr-1 sm:mr-2" />
            <span>{nft.likes || 0} likes</span>
          </div>
        </div>
        <Link href={`/flare-details/${nft.id}`}>
          <button
            className={`w-full bg-orange-500 text-white py-1 sm:py-2 rounded-md hover:bg-orange-600 transition-colors ${isMobile ? "text-xs" : "text-sm"}`}
          >
            {selectedCurrency === "USDC"
              ? `$${nft.totalUSDC || 0} USDC`
              : `${nft.totalUSDC || 0} ${selectedCurrency}`}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Gallery;
