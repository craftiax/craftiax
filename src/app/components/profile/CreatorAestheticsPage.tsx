import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaShareAlt, FaUsers, FaGift, FaComments } from "react-icons/fa";

interface CreatorAestheticsPageProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const CreatorAestheticsPage: React.FC<CreatorAestheticsPageProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 p-8 rounded-lg max-w-4xl w-full mx-4 my-8"
      >
        <h2 className="text-4xl font-bold mb-6 text-orange-500 text-center">
          Become a Creator
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl mb-6"
            >
              Unleash your creativity and connect with your audience like never
              before!
            </motion.p>
            <motion.ul
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="list-disc list-inside mb-6 space-y-4"
            >
              <li className="flex items-center">
                <FaShareAlt className="mr-2 text-orange-500" size={24} />
                Share your unique artworks with the world
              </li>
              <li className="flex items-center">
                <FaUsers className="mr-2 text-orange-500" size={24} />
                Build a loyal fanbase and engage with your supporters
              </li>
              <li className="flex items-center">
                <FaGift className="mr-2 text-orange-500" size={24} />
                Earn rewards through the innovative Flare system
              </li>
              <li className="flex items-center">
                <FaComments className="mr-2 text-orange-500" size={24} />
                Join a thriving community of artists and creators
              </li>
            </motion.ul>
          </div>
          <div className="relative h-64 md:h-auto">
            <Image
              src="/creator-collage.jpeg"
              alt="Creator Collage"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl mb-8 text-center mt-8"
        >
          Are you ready to take your creative journey to the next level?
        </motion.p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors text-lg"
          >
            Not Now
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onConfirm}
            className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors text-lg"
          >
            Let&apos;s Create!
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreatorAestheticsPage;
