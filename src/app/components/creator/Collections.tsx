import { useState, useEffect } from "react";
import Image from "next/image";
import { FaFire } from "react-icons/fa";

interface Collection {
  id: string | number;
  name: string;
  coverImage: string;
  itemCount: number;
  totalFlares: number;
}

const Collections = ({ collections = [] }: { collections: Collection[] }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
};

const CollectionCard = ({
  collection,
  isMobile,
}: {
  collection: Collection;
  isMobile: boolean;
}) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105">
    <div className={`relative ${isMobile ? "h-32" : "h-48"}`}>
      <Image
        src={collection.coverImage}
        alt={collection.name}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className={`p-2 sm:p-4`}>
      <h3
        className={`font-semibold mb-1 sm:mb-2 ${isMobile ? "text-sm" : "text-xl"}`}
      >
        {collection.name}
      </h3>
      <div
        className={`flex justify-between items-center text-gray-400 ${isMobile ? "text-xs" : "text-sm"}`}
      >
        <span>{collection.itemCount} items</span>
        <div className="flex items-center text-orange-500">
          <FaFire
            className={`mr-1 sm:mr-2 ${isMobile ? "text-xs" : "text-base"}`}
          />
          <span>{collection.totalFlares} flares</span>
        </div>
      </div>
    </div>
  </div>
);

export default Collections;
