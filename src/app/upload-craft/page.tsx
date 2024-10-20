"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ClientLayout from "../ClientLayout";
import { FaImage, FaUpload, FaTimes } from "react-icons/fa";
import Image from "next/image";

const UploadCraft = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    setUploading(true);
    try {
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const ipfsUrl = await uploadRequest.json();
      setUploadedUrl(ipfsUrl);
      console.log("Uploaded to IPFS:", ipfsUrl);
      // Here you would typically save the metadata (title, description, ipfsUrl) to your backend
      alert("Craft uploaded successfully!");
      router.push("/creator");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    router.push("/creator");
  };

  const removeImage = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <ClientLayout>
      <div className="bg-gray-900 min-h-screen text-white py-12">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Upload New Craft
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-all relative overflow-hidden"
                >
                  {previewUrl ? (
                    <div className="w-full h-full relative group">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        layout="fill"
                        objectFit="cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={removeImage}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaImage className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">
                          Click to upload File
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  )}
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              </div>
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
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center"
                >
                  <FaUpload className="mr-2" />
                  {uploading ? "Uploading..." : "Upload Craft"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default UploadCraft;
