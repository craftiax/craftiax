"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import ProfileSelector from "../components/profile/ProfileSelector";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import { useProfile } from "../hooks/useProfile";

const ProfileSelectPage = () => {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const { profileType, updateProfileType } = useProfile();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("ProfileSelectPage useEffect", {
      isConnected,
      profileType,
      address,
    });
    if (!isConnected) {
      router.push("/connect-wallet");
    } else if (profileType) {
      console.log("Redirecting based on profileType", profileType);
      router.push(
        profileType === "creator" ? "/creator" : `/explorer/${address}`
      );
    } else {
      setIsLoading(false);
    }
  }, [isConnected, profileType, router, address]);

  const handleProfileSelection = (type: string) => {
    console.log("Profile selected:", type);
    updateProfileType(type, () => {
      console.log(
        "Profile type updated, redirecting to:",
        type === "creator" ? "/creator" : `/explorer/${address}`
      );
      if (type === "creator") {
        router.push("/creator");
      } else {
        router.push(`/explorer/${address}`);
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <ProfileSelector setProfileType={handleProfileSelection} />
      </main>
      <Footer showNewsletter={false} />
    </div>
  );
};

export default ProfileSelectPage;
