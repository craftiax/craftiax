"use client";

import { useState, useEffect } from "react";
import ClientLayout from "../../ClientLayout";

const FirebaseStatusPage = () => {
  const [connectionStatus, setConnectionStatus] = useState("Not connected");
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const testFirebaseConnection = async () => {
    try {
      const response = await fetch("/api/firebase-test");
      const data = await response.json();
      setConnectionStatus(data.message);
      setError(null);
    } catch (error) {
      setError(`Error: ${error.message}`);
      setConnectionStatus("Failed to connect");
    }
  };

  const createCollectionsAndDummyData = async () => {
    setIsCreating(true);
    try {
      const response = await fetch("/api/firebase-test?action=create");
      const data = await response.json();
      setConnectionStatus(data.message);
      setError(null);
    } catch (error) {
      setError(`Error: ${error.message}`);
      setConnectionStatus("Failed to create collections and dummy data");
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    testFirebaseConnection();
  }, []);

  return (
    <ClientLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-white text-center">
            Firebase Connection Status
          </h1>
          <div
            className={`text-center p-4 rounded-md mb-4 ${
              connectionStatus.includes("successfully")
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            <p className="text-white text-lg">{connectionStatus}</p>
          </div>
          {error && (
            <div className="mt-4 text-center p-4 rounded-md bg-yellow-600 mb-4">
              <p className="text-white text-lg">{error}</p>
            </div>
          )}
          <button
            onClick={createCollectionsAndDummyData}
            disabled={isCreating}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
              isCreating ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isCreating ? "Creating..." : "Create Collections and Dummy Data"}
          </button>
        </div>
      </div>
    </ClientLayout>
  );
};

export default FirebaseStatusPage;
