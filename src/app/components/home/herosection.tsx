import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="flex items-center justify-between px-4 py-16">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">
          Discover, Connect, Empower with Craftiax
        </h1>
        <p className="text-xl mb-8">
          Craftiax empowers creators with genuine recognition while offering
          users a seamless way to appreciate and connect with the art they love
        </p>
        <Link href="/craftflare">
          <button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-9 py-3 rounded-full text-lg font-semibold shadow-lg hover:from-orange-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 ease-in-out">
            Get Started
          </button>
        </Link>
      </div>
      <div className="relative w-1/2 h-96">
        <Image
          src="/dashboard.png"
          alt="Craftiax Dashboard"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </section>
  );
};

export default HeroSection;
