import React, { useState, useEffect } from "react";
import { FaFire, FaTimes, FaEthereum } from "react-icons/fa";
import { SiUsdc } from "react-icons/si";
import TransactionComponents from "../TransactionComponents";

interface FlareModalProps {
  isOpen: boolean;
  onClose: () => void;
  craftId: string;
  artistName: string;
  artistAddress: string;
}

const FlareModal: React.FC<FlareModalProps> = ({
  isOpen,
  onClose,
  craftId,
  artistName,
  artistAddress,
}) => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("ETH");
  const [editedArtistAddress, setEditedArtistAddress] = useState(artistAddress);
  const craftiaxAddress = "0x8ce0f94755Eb14f7AF130C1aa2cAd26dea2a2Acd"; // Replace with actual Craftiax address

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-lg max-w-md w-full shadow-2xl transform transition-all duration-300 ease-in-out border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
            Send Flare
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <div className="mb-6">
          <p className="text-xl text-gray-300 mb-2">To: {artistName}</p>
          <div className="flex items-center bg-gray-700 rounded-lg p-2">
            <FaFire className="text-orange-500 mr-2" size={20} />
            <input
              type="text"
              value={editedArtistAddress}
              onChange={(e) => setEditedArtistAddress(e.target.value)}
              className="w-full bg-transparent text-white focus:outline-none"
              placeholder="Artist Address"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Amount to send</label>
          <div className="flex items-center">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded-l-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Enter amount"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="p-2 bg-gray-700 text-white rounded-r-lg border-l border-gray-600 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="ETH">ETH</option>
              <option value="USDC" disabled>
                USDC
              </option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <TransactionComponents></TransactionComponents>
        </div>
        <div className="text-sm text-gray-400 mb-4">
          <FaEthereum className="inline mr-1" />
          <span>ETH is currently the only supported currency for flares.</span>
        </div>
        <button
          onClick={onClose}
          className="w-full mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FlareModal;
