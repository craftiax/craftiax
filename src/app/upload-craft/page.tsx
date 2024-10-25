"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import ClientLayout from "../ClientLayout";
import { FaImage, FaMusic, FaVideo, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useAccount } from "wagmi";
import {
  Transaction,
  TransactionButton,
  TransactionToast,
  TransactionToastIcon,
  TransactionToastLabel,
  TransactionToastAction,
} from "@coinbase/onchainkit/transaction";
import type { LifecycleStatus } from "@coinbase/onchainkit/transaction";
import { saveCraftDetails } from "../utils/firebaseUtils"; // Ensure this import is correct

const UploadCraft = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const { address } = useAccount();
  const [showMintTransaction, setShowMintTransaction] = useState(false);
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showMetadata, setShowMetadata] = useState(false);
  const [showFinalMetadata, setShowFinalMetadata] = useState(true);
  const [showThumbnail, setShowThumbnail] = useState(false);
  const [imageIpfsHash, setImageIpfsHash] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileType = selectedFile.type.split("/")[0];
      const fileSizeLimit =
        fileType === "image"
          ? 3 * 1024 * 1024
          : fileType === "audio"
            ? 5 * 1024 * 1024
            : 10 * 1024 * 1024;

      if (selectedFile.size > fileSizeLimit) {
        setErrorMessage(
          `File size exceeds the limit of ${fileSizeLimit / (1024 * 1024)}MB for ${fileType} files.`
        );
        return;
      }

      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setTitle(selectedFile.name.split(".").slice(0, -1).join("."));
      setErrorMessage(null);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedThumbnail = e.target.files[0];
      setThumbnail(selectedThumbnail);
      setThumbnailUrl(URL.createObjectURL(selectedThumbnail));
    }
  };

  const handleMetadataSubmit = async () => {
    if (!file) {
      setErrorMessage("Please select a file to upload");
      return;
    }

    setUploading(true);
    try {
      const imageData = new FormData();
      imageData.set("file", file);
      if (thumbnail) {
        imageData.set("thumbnail", thumbnail);
      }
      const imageUploadRequest = await fetch("/api/files", {
        method: "POST",
        body: imageData,
      });
      const imageUploadResponse = await imageUploadRequest.json();
      const imageIpfsHash = imageUploadResponse.ipfsHash;

      const metadata = {
        name: title,
        description: description,
        image: `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/ipfs/${imageIpfsHash}`,
        artist_address: address || "Unknown",
        creation_time: new Date().toISOString(),
      };

      const metadataUploadRequest = await fetch("/api/metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metadata),
      });
      const metadataUploadResponse = await metadataUploadRequest.json();
      const metadataIpfsHash = metadataUploadResponse.ipfsHash;

      const uploadedUrl = `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/ipfs/${metadataIpfsHash}`;
      setUploadedUrl(uploadedUrl);
      console.log("Metadata uploaded to IPFS:", metadataIpfsHash);
      setShowMintTransaction(true);
      setStep(3);
      setImageIpfsHash(imageIpfsHash);

      // Remove the updatedMetadata object creation

      <MintNFTTransaction
        metadataUrl={uploadedUrl}
        imageIpfsHash={imageIpfsHash}
        metadata={metadata} // Pass the original metadata here
      />;
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const MintNFTTransaction = ({
    metadataUrl,
    imageIpfsHash,
    metadata,
  }: {
    metadataUrl: string;
    imageIpfsHash: string | null;
    metadata: any; // Add this prop
  }) => {
    const BASE_SEPOLIA_CHAIN_ID = 84532;

    const contracts = [
      {
        address: "0xc3e53F2b286C6334908FcF2EBADd4349ED86048B" as `0x${string}`,
        abi: [
          {
            inputs: [
              { internalType: "address", name: "to", type: "address" },
              { internalType: "string", name: "uri", type: "string" },
            ],
            name: "safeMint",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ] as const,
        functionName: "safeMint",
        args: [address, metadataUrl],
      },
    ];

    const handleOnStatus = useCallback(
      async (status: LifecycleStatus) => {
        console.log("LifecycleStatus", status);
        if (status.statusName === "success") {
          const craftId = await saveCraftDetails(metadataUrl, metadata);
          if (craftId) {
            console.log("Craft saved with ID:", craftId);
          } else {
            console.error("Failed to save craft details");
          }
        }
      },
      [metadataUrl, metadata]
    );

    return (
      <Transaction
        chainId={BASE_SEPOLIA_CHAIN_ID}
        contracts={contracts}
        onStatus={handleOnStatus}
      >
        <TransactionButton
          text="Process Craft"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
        />
        <TransactionToast>
          <TransactionToastIcon />
          <TransactionToastLabel />
          <TransactionToastAction />
        </TransactionToast>
      </Transaction>
    );
  };

  const ProgressBar = () => {
    const progressPercentage = (step / 3) * 100;
    return (
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
        <div
          className="bg-orange-500 h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <ClientLayout>
      <div className="bg-gray-900 min-h-screen text-white py-12">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Upload New Craft
            </h1>
            <ProgressBar />
            {errorMessage && (
              <div className="mb-4 p-4 bg-red-500 text-white rounded-md">
                {errorMessage}
              </div>
            )}
            {step === 1 && (
              <div className="space-y-6">
                <p className="text-sm text-gray-400 mb-4">
                  Step 1: Select the file you want to upload. You can choose an
                  image, audio, or video file.
                </p>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-all relative overflow-hidden"
                  >
                    {previewUrl ? (
                      file?.type.startsWith("audio") ? (
                        <div className="flex flex-col items-center justify-center">
                          <FaMusic className="w-16 h-16 text-gray-400" />
                          <p className="text-sm text-gray-400 mt-2">
                            {file.name}
                          </p>
                          <audio controls className="mt-2">
                            <source src={previewUrl} type={file.type} />
                          </audio>
                        </div>
                      ) : file?.type.startsWith("video") ? (
                        <div className="flex flex-col items-center justify-center">
                          <video controls className="w-full h-48">
                            <source src={previewUrl} type={file.type} />
                          </video>
                          <p className="text-sm text-gray-400 mt-2">
                            {file.name}
                          </p>
                        </div>
                      ) : (
                        <div className="relative w-full h-full">
                          <Image
                            src={previewUrl}
                            alt="Preview"
                            layout="fill"
                            objectFit="cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={removeImage}
                              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="flex space-x-4 mb-3">
                          <FaImage className="w-8 h-8 text-gray-400" />
                          <FaMusic className="w-8 h-8 text-gray-400" />
                          <FaVideo className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">
                            Click to upload File
                          </span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">
                          Image (Max 3MB), Audio (Max 5MB), or Video (Max 10MB)
                          files
                        </p>
                      </div>
                    )}
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*,audio/*,video/*"
                    />
                  </label>
                </div>
                {file && (
                  <p className="text-sm text-gray-400 mt-2">
                    Selected file: {file.name} (
                    {(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                )}
                {file &&
                  showThumbnail &&
                  (file.type.startsWith("audio") ||
                    file.type.startsWith("video")) && (
                    <div className="flex items-center justify-center w-full mt-4">
                      <label
                        htmlFor="thumbnail-file"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-all relative overflow-hidden"
                      >
                        {thumbnailUrl ? (
                          <div className="w-full h-full relative group">
                            <Image
                              src={thumbnailUrl}
                              alt="Thumbnail Preview"
                              layout="fill"
                              objectFit="cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={() => {
                                  setThumbnail(null);
                                  setThumbnailUrl(null);
                                }}
                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                              >
                                <FaTimes />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FaImage className="w-8 h-8 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-400">
                              <span className="font-semibold">
                                Click to upload Thumbnail
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-400">
                              Image files only (Max 3MB)
                            </p>
                          </div>
                        )}
                        <input
                          id="thumbnail-file"
                          type="file"
                          className="hidden"
                          onChange={handleThumbnailChange}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  )}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => router.push("/creator")}
                    className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!file}
                    className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <p className="text-sm text-gray-400 mb-4">
                  Step 2: Enter the metadata for your craft. This includes the
                  title and description.
                </p>
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleMetadataSubmit}
                    disabled={uploading}
                    className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    {uploading ? "Processing..." : "Next"}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && uploadedUrl && (
              <div className="mt-8 p-4 bg-gray-700 rounded-lg">
                <h2 className="text-xl font-semibold mb-2 text-orange-400">
                  Final Stage
                </h2>
                <p className="text-sm text-gray-300 mb-4">
                  Step 3: Almost done, click on the button to process craft.
                  Please note that a negligible gas fee is required.
                </p>
                {showFinalMetadata && (
                  <div className="mb-4 p-4 bg-gray-800 rounded-md">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Metadata
                    </h3>
                    <p className="text-sm text-gray-300">Title: {title}</p>
                    <p className="text-sm text-gray-300">
                      Description: {description}
                    </p>
                    <p className="text-sm text-gray-300">
                      File URL: {uploadedUrl}
                    </p>
                  </div>
                )}
                <MintNFTTransaction
                  metadataUrl={uploadedUrl}
                  imageIpfsHash={imageIpfsHash}
                  metadata={metadata} // Pass the original metadata here
                />
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => router.push("/creator")}
                    className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default UploadCraft;
