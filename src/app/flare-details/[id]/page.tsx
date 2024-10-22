"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getNFTFlareDetails } from "../../../utils/nftUtils";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

interface FlareDetail {
  user: string;
  flareAmount: string;
  usdcAmount: string;
  date: Date;
  comment?: string; // Add this line with optional property
}

interface FlareDetails {
  totalUSDC: string;
  flares: FlareDetail[];
}

const FlareDetailsPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const [flareDetails, setFlareDetails] = useState<FlareDetails | null>(null);

  useEffect(() => {
    if (id) {
      const fetchFlareDetails = async () => {
        const details = await getNFTFlareDetails(id);
        setFlareDetails(details);
      };
      fetchFlareDetails();
    }
  }, [id]);

  if (!flareDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-purple-400">
          Flare Details for NFT #{id}
        </h1>
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">
            Total USDC Received: {flareDetails.totalUSDC}
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2 text-left">User ID</th>
                <th className="p-2 text-left">User Address</th>
                <th className="p-2 text-left">Flare Amount</th>
                <th className="p-2 text-left">USDC Amount</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Comment</th>
              </tr>
            </thead>
            <tbody>
              {flareDetails.flares.map((flare, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="p-2">{flare.user}</td>
                  <td className="p-2">{flare.flareAmount}</td>
                  <td className="p-2">{flare.usdcAmount}</td>
                  <td className="p-2">
                    {new Date(flare.date).toLocaleDateString()}
                  </td>
                  <td className="p-2">{flare.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FlareDetailsPage;
