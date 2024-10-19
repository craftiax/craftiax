"use client";

import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import { WalletComponents } from "../components/WalletComponents";
import CoinbaseLogo from "../components/icons/coinbaseLogo";
import { useProfile } from "../hooks/useProfile";
import Link from "next/link";

const ConnectWalletPage = () => {
  const { isConnected } = useAccount();
  const router = useRouter();
  const { profileType } = useProfile();

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (isConnected || adminLoggedIn) {
      if (!profileType) {
        router.push("/profile-select");
      } else {
        router.push(profileType === "creator" ? "/creator" : "/explorer");
      }
    }
  }, [isConnected, profileType, router]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Header showWalletConnect={false} />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-2xl p-8 text-center">
          <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
            So much to see and appreciate
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Please connect your wallet to view your profile and start your
            journey.
          </p>
          <div className="flex flex-col items-center mb-8">
            <CoinbaseLogo />
            <div className="mt-4">
              <WalletComponents />
            </div>
          </div>
          <p className="text-sm text-gray-400">
            New to crypto?{" "}
            <a href="/faq" className="text-orange-500 hover:text-orange-400">
              Learn more about wallets
            </a>
          </p>
          {!isConnected && (
            <Link href="/admin" className="text-white hover:text-gray-300">
              Admin Login
            </Link>
          )}
        </div>
      </main>
      <Footer showNewsletter={false} />
    </div>
  );
};

export default ConnectWalletPage;
