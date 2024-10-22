import React from "react";
import ClientLayout from "./ClientLayout";
import HeroSection from "./components/home/herosection";
import TrendingNFTs from "./components/home/trendingnfts";

export default function Home() {
  return (
    <ClientLayout>
      <HeroSection />
      <TrendingNFTs />
      <div className="text-center mt-8 mb-12 px-4 md:mt-16 md:mb-20">
        <span className="text-sm md:text-lg font-semibold text-gray-300">
          LEARN MORE
        </span>
        <blockquote className="mt-4 md:mt-8 text-lg md:text-2xl italic font-light text-gray-300 max-w-3xl mx-auto">
          &quot;Craftiax empowers artists to connect directly with their fans,
          revolutionizing the way we experience and support creativity in the
          digital age.
        </blockquote>
        <p className="mt-2 md:mt-4 text-sm md:text-lg text-gray-400">
          - Craftiax Founders
        </p>
        <button className="mt-6 md:mt-10 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm md:text-base py-2 px-4 md:py-3 md:px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          Connect Wallet
        </button>
      </div>
    </ClientLayout>
  );
}
