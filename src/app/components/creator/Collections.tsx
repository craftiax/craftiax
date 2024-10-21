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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
};

const CollectionCard = ({ collection }: { collection: Collection }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105">
    <div className="relative h-48">
      <Image
        src={collection.coverImage}
        alt={collection.name}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{collection.name}</h3>
      <div className="flex justify-between items-center text-gray-400">
        <span>{collection.itemCount} items</span>
        <div className="flex items-center text-orange-500">
          <FaFire className="mr-2" />
          <span>{collection.totalFlares} flares</span>
        </div>
      </div>
    </div>
  </div>
);

export default Collections;
