import Image from "next/image";

const PopularCreators = () => {
  const creators = [
    { id: 1, name: "PixelMaster", avatar: "/avatar1.jpg", followers: 10500 },
    { id: 2, name: "CryptoArtist", avatar: "/avatar2.jpg", followers: 8200 },
    { id: 3, name: "NFTWizard", avatar: "/avatar3.jpg", followers: 7800 },
    {
      id: 4,
      name: "BlockchainDreamer",
      avatar: "/avatar4.jpg",
      followers: 6500,
    },
  ];

  return (
    <div>
      <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-6 text-gray-300">
        Popular Creators
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="bg-gray-800 rounded-lg p-3 sm:p-4 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-3">
              <Image
                src={creator.avatar}
                alt={creator.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h3 className="text-sm sm:text-base font-semibold mb-1 text-gray-100 truncate">
              {creator.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              {creator.followers.toLocaleString()} followers
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCreators;
