"use client";

import CraftflareGrid from "../components/craftflare/CraftflareGrid";
import PopularCreators from "../components/craftflare/PopularCreators";
import FeaturedCollections from "../components/craftflare/FeaturedCollections";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import { useState, useEffect } from "react";
import { dummyCrafts } from "../data/dummyCrafts"; // Import the dummy data

const CraftflarePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      <div className="flex flex-1">
        {!isMobile && <Sidebar />}
        <main className={`flex-1 ${!isMobile ? "ml-64" : ""} p-4 md:p-8`}>
          <h3 className="text-lg md:text-2xl font-bold mb-4 md:mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
            Discover, Connect and Appreciate Crafts
          </h3>

          {isMobile && (
            <div className="mb-4">
              <select className="w-full bg-gray-800 text-white py-2 px-4 rounded text-sm">
                <option value="">Select Category</option>
                <option value="art">Art</option>
                <option value="collectibles">Collectibles</option>
                <option value="music">Music</option>
                <option value="photography">Photography</option>
                <option value="sports">Sports</option>
                <option value="trading-cards">Trading Cards</option>
                <option value="virtual-worlds">Virtual Worlds</option>
              </select>
            </div>
          )}

          <section className="mb-6 md:mb-12">
            <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-6 text-gray-300">
              Trending Today
            </h2>
            <CraftflareGrid crafts={dummyCrafts} />
          </section>

          <section className="mb-6 md:mb-12">
            <FeaturedCollections />
          </section>

          <section className="mb-6 md:mb-12">
            <PopularCreators />
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CraftflarePage;
