import { FaCrown, FaMedal } from "react-icons/fa";
import Image from "next/image";
import { CreatorData } from "./types";

export interface SidebarProps {
  creator: CreatorData;
}

const Sidebar: React.FC<SidebarProps> = ({ creator }) => {
  // Dummy top supporters data
  const topSupporters = [
    {
      id: 1,
      name: "CryptoWhale",
      avatar: "/avatars/supporter1.jpg",
      flares: 1500,
      rank: 1,
    },
    {
      id: 2,
      name: "NFTEnthusiast",
      avatar: "/avatars/supporter2.jpg",
      flares: 1200,
      rank: 2,
    },
    {
      id: 3,
      name: "ArtLover99",
      avatar: "/avatars/supporter3.jpg",
      flares: 900,
      rank: 3,
    },
  ];

  return (
    <div className="lg:w-1/4 bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-400">
          Top Supporters
        </h3>
        <ul className="space-y-4">
          {topSupporters.map((supporter) => (
            <li
              key={supporter.id}
              className="flex items-center bg-gray-700 p-3 rounded-lg"
            >
              <div className="relative">
                <Image
                  src={supporter.avatar}
                  alt={supporter.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                {supporter.rank === 1 && (
                  <FaCrown
                    className="absolute -top-2 -right-2 text-yellow-400"
                    size={16}
                  />
                )}
              </div>
              <div className="ml-3 flex-grow">
                <p className="font-semibold text-sm">{supporter.name}</p>
                <p className="text-xs text-gray-400">
                  {supporter.flares} flares
                </p>
              </div>
              {supporter.rank <= 3 && (
                <FaMedal
                  className={`ml-2 ${
                    supporter.rank === 1
                      ? "text-yellow-400"
                      : supporter.rank === 2
                        ? "text-gray-400"
                        : "text-orange-400"
                  }`}
                  size={20}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
