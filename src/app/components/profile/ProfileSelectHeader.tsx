import Link from "next/link";
import Image from "next/image";
import WalletConnect from "../WalletConnect";

const ProfileSelectHeader = () => {
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo2.png" alt="Craftiax Logo" width={40} height={40} />
          <span className="ml-2 text-xl font-bold text-orange-500">
            CRAFTIAX
          </span>
        </Link>
        <nav className="flex items-center">
          <ul className="flex space-x-6 mr-6">
            <li>
              <Link
                href="/"
                className="hover:text-orange-500 transition-colors"
              >
                Home
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
          <WalletConnect />
        </nav>
      </div>
    </header>
  );
};

export default ProfileSelectHeader;
