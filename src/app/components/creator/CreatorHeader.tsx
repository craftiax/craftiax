import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

const CreatorHeader = ({ creator, children }) => (
  <div className="relative h-80">
    <Image
      src={creator.bannerImage}
      alt={`${creator.name}'s banner`}
      layout="fill"
      objectFit="cover"
      className="brightness-50"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40">
      <div className="container mx-auto h-full px-4 flex flex-col justify-end pb-6">
        <div className="flex items-end justify-between">
          <div className="flex items-end">
            <Image
              src={creator.profileImage}
              alt={creator.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-gray-900"
            />
            <div className="ml-6">
              <h1 className="text-4xl font-bold flex items-center text-white">
                {creator.name}
                {creator.isVerified && (
                  <FaCheckCircle className="text-blue-500 ml-2" />
                )}
              </h1>
              <p className="text-xl text-gray-300 mt-2">{creator.tagline}</p>
            </div>
          </div>
          <div className="flex items-center">{children}</div>
        </div>
      </div>
    </div>
  </div>
);

export default CreatorHeader;
