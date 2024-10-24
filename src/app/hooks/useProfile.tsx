import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { getUserProfile } from "../utils/firebaseUtils";

export const useProfile = () => {
  const { address, isConnected } = useAccount();
  const [profileType, setProfileType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileType = async () => {
      setIsLoading(true);
      if (isConnected && address) {
        const userProfile = await getUserProfile(address);
        setProfileType(userProfile?.profileType || null);
      } else {
        setProfileType(null);
      }
      setIsLoading(false);
    };

    fetchProfileType();
  }, [isConnected, address]);

  return { profileType, isLoading, setProfileType };
};
