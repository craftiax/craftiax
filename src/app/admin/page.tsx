"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

const AdminPage = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");
  const router = useRouter();

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    setIsAdminLoggedIn(adminLoggedIn);
  }, []);

  const handleLoginToggle = () => {
    const newLoginState = !isAdminLoggedIn;
    setIsAdminLoggedIn(newLoginState);
    localStorage.setItem("adminLoggedIn", newLoginState.toString());
    if (newLoginState) {
      router.push("/profile-select");
    }
  };

  const clearUserProfile = () => {
    if (accountAddress) {
      const key = `profileType_${accountAddress}`;
      localStorage.removeItem(key);
      alert(`Profile for account ${accountAddress} has been cleared.`);
      setAccountAddress(""); // Clear the input field after use
    } else {
      alert("Please enter an account address.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Header showWalletConnect={false} />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-2xl p-8 text-center">
          <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
            Admin Login
          </h1>
          <div className="flex items-center justify-center mb-4">
            <span className="mr-2 text-white">Admin Login:</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isAdminLoggedIn}
                onChange={handleLoginToggle}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <p className="text-white mb-6">
            {isAdminLoggedIn ? "Logged in as admin" : "Not logged in"}
          </p>
          {isAdminLoggedIn && (
            <div className="mt-6">
              <input
                type="text"
                value={accountAddress}
                onChange={(e) => setAccountAddress(e.target.value)}
                placeholder="Enter account address"
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              />
              <button
                onClick={clearUserProfile}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Clear User Profile
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer showNewsletter={false} />
    </div>
  );
};

export default AdminPage;
