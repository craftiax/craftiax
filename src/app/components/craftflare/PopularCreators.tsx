import Image from "next/image";

const PopularCreators = () => {
  const creators = [
    { id: 1, name: "PixelMaster", image: "/creator1.jpg" },
    { id: 2, name: "VectorQueen", image: "/creator2.jpg" },
    { id: 3, name: "3DWizard", image: "/creator3.jpg" },
    // Add more creators as needed
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Popular Creators</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="bg-gray-800 rounded-lg overflow-hidden"
          >
            <div className="relative">
              <Image
                src={creator.image}
                alt={creator.name}
                width={300}
                height={200}
                className="w-full h-auto"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{creator.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCreators;
