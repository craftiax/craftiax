import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaHeart, FaUser } from "react-icons/fa";
import { useAccount } from "wagmi";
import { registerUser } from "../utils/firebaseUtils";

interface UserOnboardingProps {
  onComplete: () => void;
}

const UserOnboarding: React.FC<UserOnboardingProps> = ({ onComplete }) => {
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [profileType, setProfileType] = useState<string>("");
  const router = useRouter();
  const { address } = useAccount();

  const interestOptions = [
    "Digital Art",
    "Music",
    "Photography",
    "Collectibles",
    "Virtual Worlds",
    "Sports",
    "Gaming",
  ];

  const handleInterestToggle = (interest: string) => {
    setInterests((prevInterests) =>
      prevInterests.includes(interest)
        ? prevInterests.filter((i) => i !== interest)
        : [...prevInterests, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && interests.length > 0 && profileType && address) {
      const success = await registerUser(
        address,
        email.trim(),
        profileType,
        interests
      );
      if (success) {
        onComplete();
        router.push(profileType === "creator" ? "/creator" : "/craftflare");
      } else {
        // Handle registration error
        console.error("Failed to register user");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          Welcome to Craftiax!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-white block mb-2 text-sm sm:text-base"
            >
              <FaEnvelope className="inline-block mr-2" />
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="text-white block mb-2 text-sm sm:text-base">
              <FaUser className="inline-block mr-2" />
              Profile Type
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setProfileType("creator")}
                className={`px-4 py-2 rounded-md text-sm sm:text-base font-medium ${
                  profileType === "creator"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                Creator
              </button>
              <button
                type="button"
                onClick={() => setProfileType("explorer")}
                className={`px-4 py-2 rounded-md text-sm sm:text-base font-medium ${
                  profileType === "explorer"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                Craft Explorer
              </button>
            </div>
          </div>
          <div>
            <label className="text-white block mb-2 text-sm sm:text-base">
              <FaHeart className="inline-block mr-2" />
              Your Interests (Select at least one)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium ${
                    interests.includes(interest)
                      ? "bg-orange-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-3 rounded-md hover:from-orange-600 hover:to-pink-700 transition-colors text-sm sm:text-base font-semibold"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserOnboarding;
