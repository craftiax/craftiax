"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { WalletComponents } from "../WalletComponents";
import { useProfile } from "../../hooks/useProfile";
import { useAccount } from "wagmi";

interface HeaderProps {
  showWalletConnect?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showWalletConnect = true }) => {
  const { isConnected, address } = useAccount();
  const { profileType } = useProfile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getDashboardLink = () => {
    if (!isConnected) return "/connect-wallet";
    if (!profileType) return "/profile-select";
    return profileType === "creator"
      ? "/creator"
      : `/explorer/${address || ""}`;
  };

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo2.png"
            alt="Craftiax Logo"
            width={32}
            height={32}
            className="md:w-10 md:h-10"
          />
          <span className="ml-2 text-xl md:text-2xl font-bold text-orange-500">
            CRAFTIAX
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li>
              <Link
                href={getDashboardLink()}
                className="hover:text-orange-500 transition-colors"
              >
                {isConnected
                  ? profileType
                    ? "Dashboard"
                    : "Select Profile"
                  : "Connect Wallet"}
              </Link>
            </li>
            <li>
              <Link
                href="/craftflare"
                className="hover:text-orange-500 transition-colors"
              >
                CraftFlare
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="hover:text-orange-500 transition-colors"
              >
                FAQ
              </Link>
            </li>
          </ul>
          {showWalletConnect && <WalletComponents />}
        </nav>
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-2">
          <ul className="flex flex-col space-y-2 px-4">
            <li>
              <Link
                href={getDashboardLink()}
                className="block py-2 text-sm hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {isConnected
                  ? profileType
                    ? "Dashboard"
                    : "Select Profile"
                  : "Connect Wallet"}
              </Link>
            </li>
            <li>
              <Link
                href="/craftflare"
                className="block py-2 text-sm hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                CraftFlare
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="block py-2 text-sm hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
            </li>
          </ul>
          {showWalletConnect && (
            <div className="px-4 py-2">
              <WalletComponents />
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
