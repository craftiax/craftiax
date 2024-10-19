import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 flex flex-col h-full">
        <Link href="/" className="flex items-center mb-6">
          <Image src="/logo2.png" alt="Craftiax Logo" width={40} height={40} />
          <span className="ml-2 text-xl font-bold">CRAFTIAX</span>
        </Link>
        <nav className="mt-24">
          <ul className="space-y-2">
            <li className="mb-4">
              <h3 className="text-base font-semibold text-blue-500 uppercase px-4 py-2 bg-blue-600 bg-opacity-20 rounded">
                NFT Categories
              </h3>
            </li>
            {[
              "Art",
              "Collectibles",
              "Music",
              "Photography",
              "Sports",
              "Trading Cards",
              "Virtual Worlds",
            ].map((category) => (
              <li key={category}>
                <Link
                  href={`/craftflare/${category
                    .toLowerCase()
                    .replace(" ", "-")}`}
                  className="block py-2 px-4 text-base hover:bg-gray-800 rounded"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
