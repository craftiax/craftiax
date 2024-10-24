"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import UserOnboarding from "../components/UserOnboarding";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import { useProfile } from "../hooks/useProfile";
import ProfileSelector from "../components/profile/ProfileSelector";
import { updateUserProfileType } from "../utils/firebaseUtils";

const ProfileSelectPage = () => {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const { profileType, isLoading, setProfileType } = useProfile();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    console.log(
      "ProfileSelectPage: mode =",
      mode,
      "profileType =",
      profileType
    );
    if (!isConnected) {
      router.push("/connect-wallet");
    } else if (profileType && mode !== "explorer") {
      router.push(profileType === "creator" ? "/creator" : "/craftflare");
    } else if (!isLoading) {
      setShowOnboarding(true);
    }
  }, [isConnected, profileType, router, address, isLoading, mode]);

  const handleProfileSelection = async (type: string) => {
    console.log("Profile selected:", type);
    if (address) {
      const success = await updateUserProfileType(address, type);
      if (success) {
        setProfileType(type);
        router.push(type === "creator" ? "/creator" : "/craftflare");
      } else {
        console.error("Failed to update profile type");
        // Handle error (e.g., show error message to user)
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        {showOnboarding &&
          (mode === "explorer" ? (
            <ProfileSelector setProfileType={handleProfileSelection} />
          ) : (
            <UserOnboarding onComplete={() => setShowOnboarding(false)} />
          ))}
      </main>
      <Footer showNewsletter={false} />
    </div>
  );
};

export default ProfileSelectPage;
