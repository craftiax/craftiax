import { FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";

interface Creator {
  bio: string;
  skills: string[];
  socialLinks: {
    twitter: string;
    instagram: string;
    website: string;
  };
}

interface AboutProps {
  creator: Creator;
}

const About: React.FC<AboutProps> = ({ creator }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">About PixelMaster</h2>
      <p className="text-sm sm:text-base text-gray-300 mb-6">{creator.bio}</p>

      <h3 className="text-lg sm:text-xl font-semibold mb-3">Skills</h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {creator.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-gray-700 text-orange-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      <h3 className="text-lg sm:text-xl font-semibold mb-3">Connect</h3>
      <div className="flex space-x-4">
        <a
          href={creator.socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href={creator.socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-400 hover:text-pink-300"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href={creator.socialLinks.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-green-300"
        >
          <FaGlobe size={24} />
        </a>
      </div>
    </div>
  );
};

export default About;
