"use client";

import Image from "next/image";
import Link from "next/link";
import { WalletComponents } from "../WalletComponents";
import { useProfile } from "../../hooks/useProfile";
import { useAccount } from "wagmi";

interface HeaderProps {
  showWalletConnect?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showWalletConnect = true }) => {
  const { isConnected, address } = useAccount();
  const { profileType } = useProfile();

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
          <Image src="/logo2.png" alt="Craftiax Logo" width={40} height={40} />
          <span className="ml-2 text-2xl font-bold text-orange-500">
            CRAFTIAX
          </span>
        </Link>
        <nav className="flex items-center space-x-6">
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
      </div>
    </header>
  );
};

export default Header;
