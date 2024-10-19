import Image from "next/image";

const FeaturedCollections = () => {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <div className="relative h-48">
            <Image
              src={collection.image}
              alt={collection.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-100">
              {collection.name}
            </h3>
            <p className="text-sm text-gray-400 mb-2">by {collection.artist}</p>
            <p className="text-sm text-gray-300">{collection.items} items</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedCollections;
