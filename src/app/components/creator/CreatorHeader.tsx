import Image from "next/image";
import { FaCheckCircle, FaUpload } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Creator {
  name: string;
  bannerImage: string;
  profileImage: string;
  isVerified: boolean;
  tagline: string;
}

const CreatorHeader = ({
  creator,
  children,
}: {
  creator: Creator;
  children: React.ReactNode;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleUploadCraft = () => {
    router.push("/upload-craft");
  };

  return (
    <div className="relative h-60 sm:h-80">
      <Image
        src={creator.bannerImage}
        alt={`${creator.name}'s banner`}
        layout="fill"
        objectFit="cover"
        className="brightness-50"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40">
        <div className="container mx-auto h-full px-4 flex flex-col justify-end pb-4 sm:pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center sm:items-end">
              <Image
                src={creator.profileImage}
                alt={creator.name}
                width={isMobile ? 80 : 120}
                height={isMobile ? 80 : 120}
                className="rounded-full border-4 border-gray-900"
              />
              <div className="ml-4 sm:ml-6">
                <h1 className="text-xl sm:text-4xl font-bold flex items-center text-white">
                  {creator.name}
                  {creator.isVerified && (
                    <FaCheckCircle className="text-blue-500 ml-2" />
                  )}
                </h1>
                <p className="text-xs sm:text-xl text-gray-300 mt-1 sm:mt-2">
                  {creator.tagline}
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto sm:mt-0">
              {isMobile ? (
                <button
                  onClick={handleUploadCraft}
                  className="flex items-center justify-center px-3 py-1.5 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-200 text-xs font-medium"
                >
                  <FaUpload className="mr-1.5" size={12} />
                  Upload
                </button>
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorHeader;
