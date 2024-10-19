import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

export const useProfile = () => {
  const { address, isConnected } = useAccount();
  const [profileType, setProfileType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileType = async () => {
      setIsLoading(true);
      if (isConnected && address) {
        const storedProfileType = localStorage.getItem(
          `profileType_${address}`
        );
        setProfileType(storedProfileType);
      } else {
        setProfileType(null);
      }
      setIsLoading(false);
    };

    fetchProfileType();
  }, [isConnected, address]);

  const updateProfileType = (newProfileType: string) => {
    if (address) {
      localStorage.setItem(`profileType_${address}`, newProfileType);
      setProfileType(newProfileType);
    }
  };

  return { profileType, updateProfileType, isLoading };
};
