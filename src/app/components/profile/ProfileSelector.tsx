import React from "react";
import { FaPaintBrush, FaUserAstronaut } from "react-icons/fa";

interface ProfileSelectorProps {
  setProfileType: (type: string) => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({
  setProfileType,
}) => {
  const handleProfileSelection = (type: string) => {
    console.log("Profile selected:", type);
    setProfileType(type);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => handleProfileSelection("creator")}
        className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-lg text-left hover:from-orange-600 hover:to-pink-700 transition duration-300 flex items-center"
      >
        <FaPaintBrush className="text-2xl mr-4" />
        <div>
          <h3 className="text-lg font-semibold">Creator Profile</h3>
          <p className="text-sm opacity-80">
            Share your art and build your fanbase
          </p>
        </div>
      </button>
      <button
        onClick={() => handleProfileSelection("explorer")}
        className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-left hover:from-blue-600 hover:to-purple-700 transition duration-300 flex items-center"
      >
        <FaUserAstronaut className="text-2xl mr-4" />
        <div>
          <h3 className="text-lg font-semibold">Art Explorer Profile</h3>
          <p className="text-sm opacity-80">
            Discover and collect amazing artworks
          </p>
        </div>
      </button>
    </div>
  );
};

export default ProfileSelector;
