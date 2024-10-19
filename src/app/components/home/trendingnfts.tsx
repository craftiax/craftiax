import Image from "next/image";

const TrendingNFTs = () => {
  const nfts = [
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

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Trending Today
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src={nft.image}
                alt={nft.name}
                width={300}
                height={300}
                className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-semibold">{nft.name}</p>
                <p className="text-sm">by {nft.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingNFTs;
