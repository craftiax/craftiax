import React from "react";
import ClientLayout from "./ClientLayout";
import HeroSection from "./components/home/herosection";
import TrendingNFTs from "./components/home/trendingnfts";

export default function Home() {
  return (
    <ClientLayout>
      <HeroSection />
      <TrendingNFTs />
      <div className="text-center mt-16 mb-20 px-4">
        <span className="text-lg font-semibold text-gray-300">LEARN MORE</span>
        <blockquote className="mt-8 text-2xl italic font-light text-gray-300 max-w-3xl mx-auto">
          &quot;Craftiax empowers artists to connect directly with their fans,
          revolutionizing the way we experience and support creativity in the
          digital age.
        </blockquote>
        <p className="mt-4 text-lg text-gray-400">- Craftiax Founders</p>
        <button className="mt-10 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          Connect Wallet
        </button>
      </div>
    </ClientLayout>
  );
}