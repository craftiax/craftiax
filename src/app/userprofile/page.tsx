"use client";

import React, { useState, useEffect } from "react";
import { useConnectWallet } from "@coinbase/onchainkit";
import { useAccount } from "wagmi";
import {
  Avatar,
  Identity,
  Name,
  Badge,
  Address,
} from "@coinbase/onchainkit/identity";

const UserProfile = () => {
  const { connect } = useConnectWallet();
  const { address, isConnected } = useAccount();
  const [userNFTs, setUserNFTs] = useState([]);

  // Using the specific address and schema ID provided
  const specificAddress = "0x838aD0EAE54F99F1926dA7C3b6bFbF617389B4D9";
  const schemaId =
    "0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9";

  useEffect(() => {
    const fetchUserNFTs = async () => {
      if (address) {
        // Replace this with your actual API call
        const nfts = await fetchNFTsForAddress(address);
        setUserNFTs(nfts);
      }
    };

    fetchUserNFTs();
  }, [address]);

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">
          Please connect your wallet to view your profile
        </h1>
        <button
          onClick={connect}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <Identity address={specificAddress} schemaId={schemaId}>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16 rounded-full" />
            <div>
              <Name className="text-xl font-semibold">
                <Badge className="ml-2" />
              </Name>
              <Address className="text-gray-600" />
            </div>
          </div>
        </Identity>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Connected Wallet Address</h2>
        <p className="text-gray-600">{address}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your NFTs</h2>
        {userNFTs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userNFTs.map((nft, index) => (
              <div key={index} className="border rounded-lg p-4">
                {/* Replace with actual NFT display component */}
                <p>NFT #{index + 1}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No NFTs found for this address.</p>
        )}
      </div>
    </div>
  );
};

// Placeholder function - replace with actual API call
const fetchNFTsForAddress = async (address) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return []; // Return empty array for now
};

export default UserProfile;
