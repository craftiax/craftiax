"use client";

import React from "react";
import Image from "next/image";
import ClientLayout from "../ClientLayout";
import { FaWallet, FaEthereum, FaEllipsisH } from "react-icons/fa";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import CoinbaseLogo from "../components/icons/coinbaseLogo";
import { WalletComponents } from "../components/WalletComponents";

const ConnectWalletPage = () => {
  return (
    <ClientLayout showWalletConnect={false}>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8 sm:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6 sm:space-y-10">
          <div className="text-center">
            <FaWallet className="mx-auto text-4xl sm:text-6xl text-orange-500 mb-4 sm:mb-6" />
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2 sm:mb-3">
              Connect Your Wallet
            </h1>
            <p className="text-base sm:text-xl text-gray-300">
              Choose a wallet to connect to Craftiax
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 space-y-6 sm:space-y-8">
            <div className="w-full   text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-sm sm:text-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center">
              <WalletComponents />
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <WalletOption
                icon={<CoinbaseLogo className="w-6 h-6" />}
                name="Coinbase"
              />
              <WalletOption
                icon={
                  <Image
                    src="/metamask.svg"
                    alt="MetaMask"
                    width={24}
                    height={24}
                  />
                }
                name="MetaMask"
              />
              <WalletOption
                icon={<FaEthereum className="text-2xl text-blue-500" />}
                name="Ethereum"
              />
              <WalletOption
                icon={<FaEllipsisH className="text-xl text-gray-400" />}
                name="Lots More"
              />
            </div>
          </div>

          <p className="text-center text-xs sm:text-sm text-gray-400">
            By connecting a wallet, you agree to Craftiax&apos;s{" "}
            <a
              href="#"
              className="text-orange-500 hover:text-orange-400 underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-orange-500 hover:text-orange-400 underline"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </ClientLayout>
  );
};

const WalletOption = ({
  icon,
  name,
}: {
  icon: React.ReactNode;
  name: string;
}) => (
  <div className="flex flex-col items-center space-y-1">
    <div className="bg-gray-700 p-2 rounded-full w-10 h-10 flex items-center justify-center">
      {icon}
    </div>
    <span className="text-xs font-medium text-gray-300">{name}</span>
  </div>
);

export default ConnectWalletPage;
