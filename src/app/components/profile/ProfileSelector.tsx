import React from "react";
import { FaPaintBrush, FaUserAstronaut } from "react-icons/fa";
import { useSearchParams, useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { updateUserProfileType } from "../../utils/firebaseUtils";

interface ProfileSelectorProps {
  setProfileType: (type: string) => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({
  setProfileType,
}) => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const { address } = useAccount();
  const router = useRouter();

  const handleProfileSelection = async (type: string) => {
    console.log("Profile selected:", type);
    if (address) {
      const success = await updateUserProfileType(address, type);
      if (success) {
        setProfileType(type);
        if (type === "explorer") {
          router.push("/craftflare");
        } else {
          // Handle creator selection or other profile types
          router.push("/creator");
        }
      } else {
        console.error("Failed to update profile type");
        // Handle error (e.g., show error message to user)
      }
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => handleProfileSelection("creator")}
        className={`w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-lg text-left transition duration-300 flex items-center ${
          mode === "explorer"
            ? "opacity-50 cursor-not-allowed"
            : "hover:from-orange-600 hover:to-pink-700"
        }`}
        disabled={mode === "explorer"}
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
