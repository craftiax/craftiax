import Image from "next/image";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedCollections = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const collections = [
    {
      id: 1,
      name: "Cosmic Creatures",
      artist: "Stella Nova",
      image: "/collection1.jpg",
      items: 1000,
    },
    {
      id: 2,
      name: "Retro Robots",
      artist: "Pixel Punk",
      image: "/collection2.jpg",
      items: 750,
    },
    {
      id: 3,
      name: "Ethereal Landscapes",
      artist: "Dreamy Designs",
      image: "/collection3.jpg",
      items: 500,
    },
    {
      id: 4,
      name: "Crypto Cats",
      artist: "Feline Fine",
      image: "/collection4.jpg",
      items: 1200,
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

  const renderCollectionItem = (collection) => (
    <div
      key={collection.id}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
    >
      <div className="relative h-40 sm:h-48">
        <Image
          src={collection.image}
          alt={collection.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-base font-semibold mb-1 text-gray-100 truncate">
          {collection.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 mb-1 truncate">
          by {collection.artist}
        </p>
        <p className="text-xs sm:text-sm text-gray-300">
          {collection.items} items
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-6 text-gray-300">
        Featured Collections
      </h2>
      {isMobile ? (
        <div className="mobile-slider">
          <Slider {...settings}>
            {collections.map((collection) => (
              <div key={collection.id} className="px-2">
                {renderCollectionItem(collection)}
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {collections.map((collection) => renderCollectionItem(collection))}
        </div>
      )}
    </div>
  );
};

export default FeaturedCollections;
