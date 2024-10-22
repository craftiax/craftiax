"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./trendingnfts.css";

interface NFT {
  id: number;
  name: string;
  image: string;
  artist: string;
}

const TrendingNFTs: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const nfts: NFT[] = [
    {
      id: 1,
      name: "Cosmic Voyage #1",
      image: "/nft1.jpeg",
      artist: "CryptoArtist1",
    },
    {
      id: 2,
      name: "Digital Dreams #42",
      image: "/nft2.jpg",
      artist: "NFTCreator2",
    },
    {
      id: 3,
      name: "Neon Nebula #7",
      image: "/nft3.jpeg",
      artist: "PixelMaster3",
    },
    {
      id: 4,
      name: "Quantum Quasar #13",
      image: "/nft4.jpg",
      artist: "CryptoVisionary4",
    },
    {
      id: 5,
      name: "Ethereal Echo #21",
      image: "/nft5.jpg",
      artist: "BlockchainBard5",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const renderNFTItem = (nft: NFT) => (
    <div
      key={nft.id}
      className="nft-item relative overflow-hidden rounded-lg shadow-lg"
    >
      <img
        src={nft.image}
        alt={nft.name}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      <div className="absolute bottom-2 left-2 right-2 text-white">
        <p className="font-semibold text-sm">{nft.name}</p>
        <p className="text-xs">by {nft.artist}</p>
      </div>
    </div>
  );

  return (
    <section className="py-8 md:py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-white">
          Trending Today
        </h2>
        {isMobile ? (
          <div className="mobile-slider">
            <Slider {...settings}>
              {nfts.map((nft) => (
                <div key={nft.id} className="px-2">
                  {renderNFTItem(nft)}
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {nfts.map((nft) => renderNFTItem(nft))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingNFTs;
