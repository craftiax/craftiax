import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaDiscord, FaYoutube, FaInstagram } from "react-icons/fa";

interface FooterProps {
  showNewsletter?: boolean;
}

const Footer: React.FC<FooterProps> = ({ showNewsletter = true }) => {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1 mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4 text-orange-500">CRAFTIAX</h3>
            <p className="text-sm text-gray-400">
              Empowering creators and fans through blockchain technology.
            </p>
          </div>

          {showNewsletter && (
            <div className="col-span-2 md:col-span-2 order-last md:order-none mb-8 md:mb-0">
              <h3 className="text-lg font-bold mb-4 text-orange-500">
                STAY IN THE LOOP
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Join our mailing list to stay in the loop with our newest
                feature releases, NFT drops, and tips and tricks for navigating
                Craftiax.
              </p>
              <form className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-md sm:rounded-r-none mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded-md sm:rounded-l-none hover:bg-orange-600 transition duration-300"
                >
                  Sign Up
                </button>
              </form>
            </div>
          )}

          <div className="w-full md:w-auto mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4 text-orange-500">
              LEARN MORE
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-orange-500 transition duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/developers"
                  className="hover:text-orange-500 transition duration-300"
                >
                  Developers
                </Link>
              </li>
              <li>
                <Link
                  href="/download"
                  className="hover:text-orange-500 transition duration-300"
                >
                  Download
                </Link>
              </li>
              <li>
                <Link
                  href="/institutional"
                  className="hover:text-orange-500 transition duration-300"
                >
                  Craftiax Institutional
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-orange-500 transition duration-300"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="hover:text-orange-500 transition duration-300"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-auto mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4 text-orange-500">
              GET INVOLVED
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://github.com/your-repo"
                  className="hover:text-orange-500 transition duration-300"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="/base"
                  className="hover:text-orange-500 transition duration-300"
                >
                  Base Ecosystem
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-orange-500 transition duration-300"
                >
                  Open Positions
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-orange-500 transition duration-300"
                >
                  Swag Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="hover:text-orange-500 transition duration-300"
                >
                  Press & Partnerships
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-auto">
            <h3 className="text-lg font-bold mb-4 text-orange-500">LEGAL</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-orange-500 transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-orange-500 transition duration-300"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/contributor-agreement"
                  className="hover:text-orange-500 transition duration-300"
                >
                  Contributor License Agreement
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap"
                  className="hover:text-orange-500 transition duration-300"
                >
                  Site Map
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0 text-center md:text-left">
            © 2024 Craftiax, Inc. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-400 hover:text-white">
              <FaTwitter />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <FaDiscord />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <FaYoutube />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
